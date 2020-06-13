import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import env from "../../tmp/env";

/**
 * The instantiated Firebase API
 */
export const app = firebase.initializeApp(env);

/**
 * Reference to authentication status and supporting methods
 */
export const auth = app.auth();

/**
 * Reference to the app's database
 */
export const db = firebase.firestore();
