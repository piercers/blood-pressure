import * as firebase from "firebase";
import * as firebaseui from "firebaseui";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

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
  tenantId: string;
  uid: string;
}

export type User = UserSerialized | undefined;

export const user: User = undefined;

export const auth = app.auth();

export const onAuthStateChanged = new Observable<firebase.User>(observer =>
  auth.onAuthStateChanged(observer)
).pipe(map(authState => (authState ? authState.toJSON() : undefined)));

const ui = new firebaseui.auth.AuthUI(auth);

export const signOut = () => auth.signOut();

export const uiStart = (element: HTMLElement): Observable<void> =>
  new Observable(observer => {
    ui.start(element, {
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      callbacks: {
        signInSuccessWithAuthResult: () => false,
        uiShown: () => {
          observer.next();
          observer.complete();
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
