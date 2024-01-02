import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

export const FireBaseConfig = {
  apiKey: "AIzaSyBKHhJOoE8DtSQ2K-8nihSq4daDY8hlxpQ",
  authDomain: "party-app-86cc5.firebaseapp.com",
  projectId: "party-app-86cc5",
  storageBucket: "party-app-86cc5.appspot.com",
  messagingSenderId: "163404500389",
  appId: "1:163404500389:web:8fcf2ea1e902a5f799ac4c",
  measurementId: "G-NN15W12WKT",
};

if (!firebase.apps.length) {
  firebase.initializeApp(FireBaseConfig);
}

export const authService = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const getFirebaseAuth = getAuth();
export const db = getFirestore();
