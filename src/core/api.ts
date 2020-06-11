// TODO import * as firebase from "firebase/app";
// - import "firebase/firestore"
import * as firebase from "firebase";

import firebaseConfig from "../../tmp/firebase-config";

// TODO Only needed services
export const app = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
