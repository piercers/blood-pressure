// TODO import * as firebase from "firebase/app";
// - import "firebase/firestore"
import * as firebase from "firebase";
import * as firebaseui from "firebaseui";
import { Observable, from } from "rxjs";

type User = firebase.User | null;

export const user: User = null;

// TODO Only needed services
export const app = firebase.initializeApp({
  apiKey: "AIzaSyDuhRSUr7ub8istev24u7Z_rkzQQrq2bV0",
  authDomain: "blood-pressure-prod.firebaseapp.com",
  databaseURL: "https://blood-pressure-prod.firebaseio.com",
  projectId: "blood-pressure-prod",
  storageBucket: "blood-pressure-prod.appspot.com",
  messagingSenderId: "604839321626",
  appId: "1:604839321626:web:dc4333681769b591b631a3",
  measurementId: "G-G491VN9HKS"
});

const ui = new firebaseui.auth.AuthUI(firebase.auth());

export const getCurrentUser = (): Observable<firebase.User | null> =>
  new Observable(observer => {
    firebase.auth().onAuthStateChanged(user => {
      observer.next(user);
    });
  });

export const signOut = () => {
  return from(firebase.auth().signOut());
};

interface AuthStatus {
  currentUser?: firebase.auth.UserCredential;
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
          observer.next({ currentUser: authResult });
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
