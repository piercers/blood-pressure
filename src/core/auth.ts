import * as firebase from "firebase";
import * as firebaseui from "firebaseui";
import { Observable } from "rxjs";

import { app } from "@/core/api";

interface UserSerialized {
  apiKey: string;
  appName: string;
  authDomain: string;
  createdAt: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  multiFactor: firebase.User.MultiFactorUser;
  phoneNumber: string;
  photoURL: string;
  providerData: firebase.UserInfo[];
  redirectEventId: string;
  stsTokenManager: any;
  tenantId: string;
  uid: string;
}

export type User = UserSerialized | null;

export const user: User = null;

const ui = new firebaseui.auth.AuthUI(app.auth());

export const getCurrentUser = (): Observable<firebase.User | null> =>
  new Observable(observer => {
    firebase.auth().onAuthStateChanged(user => {
      observer.next(user);
    });
  });

export const signOut = () => firebase.auth().signOut();

interface AuthStatus {
  currentUser?: User;
  uiShown?: true;
}

export const uiStart = (element: HTMLElement): Observable<AuthStatus> =>
  new Observable(observer => {
    ui.start(element, {
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      callbacks: {
        signInSuccessWithAuthResult: (
          authResult: firebase.auth.UserCredential
        ) => {
          observer.next({ currentUser: authResult.user?.toJSON() as User });
          observer.complete();
          return false;
        },
        signInFailure: (error: firebaseui.auth.AuthUIError) => {
          observer.error(error);
          return Promise.resolve();
        },
        uiShown: () => {
          observer.next({ uiShown: true });
        }
      },
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false
        }
      ]
    });
  });
