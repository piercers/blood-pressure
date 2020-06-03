// TODO import * as firebase from "firebase/app";
// - import "firebase/firestore"
import * as firebase from "firebase";

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

export const db = firebase.firestore();
