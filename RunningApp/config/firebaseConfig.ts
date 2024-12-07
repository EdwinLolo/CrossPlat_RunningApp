// src/config/firebaseConfig.ts
import { initializeApp, getApps } from "@firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD8smnOc3GEi9zu5FopFsICMeVUwnk8wMc",
  authDomain: "edwinfedoralolouts.firebaseapp.com",
  projectId: "edwinfedoralolouts",
  storageBucket: "edwinfedoralolouts.appspot.com",
  messagingSenderId: "742493209788",
  appId: "1:742493209788:web:e8e76b4f26bf20d83a3cb9",
  measurementId: "G-4PH087HKTR",
};

let FIREBASE_APP;
if (!getApps().length) {
  FIREBASE_APP = initializeApp(firebaseConfig);
} else {
  FIREBASE_APP = getApps()[0];
}

const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const FIREBASE_AUTH = auth;
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
