// src/config/firebaseConfig.ts
import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXLaaPEKyT5bW6xmPnEh8VQ0UhaxjBvT4",
  authDomain: "crossplatrunningapp-85415.firebaseapp.com",
  projectId: "crossplatrunningapp-85415",
  storageBucket: "crossplatrunningapp-85415.firebasestorage.app",
  messagingSenderId: "97169356305",
  appId: "1:97169356305:web:e52d43691611b12f21a3b0",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
