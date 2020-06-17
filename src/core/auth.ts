import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { auth } from "./api";
import { User } from "./auth.interfaces";

export const user: User = undefined;

/**
 * Stream of changes to the user's auth status
 */
export const onAuthStateChanged = new Observable<firebase.User>(observer =>
  auth.onAuthStateChanged(observer)
).pipe(map(authState => (authState ? authState.toJSON() : undefined)));

const ui = new firebaseui.auth.AuthUI(auth);

/**
 * Ends the currently authenticated user's session
 */
export const signOut = () => auth.signOut();

/**
 * Creates a Firebase Auth UI on a given element
 */
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
