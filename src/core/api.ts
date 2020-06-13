import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import firebaseConfig from "../../tmp/firebase-config";

export const app = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
