// src/config/firebaseConfig.ts
import { initializeApp, getApps } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyCXLaaPEKyT5bW6xmPnEh8VQ0UhaxjBvT4",
//   authDomain: "crossplatrunningapp-85415.firebaseapp.com",
//   projectId: "crossplatrunningapp-85415",
//   storageBucket: "crossplatrunningapp-85415.firebasestorage.app",
//   messagingSenderId: "97169356305",
//   appId: "1:97169356305:web:e52d43691611b12f21a3b0",
// };

const firebaseConfig = {
  apiKey: "AIzaSyA7W12MBd88XeGaZClrRyVyPzLLW2awhiE",
  authDomain: "runningappmap-e6423.firebaseapp.com",
  projectId: "runningappmap-e6423",
  storageBucket: "runningappmap-e6423.appspot.com",
  messagingSenderId: "668079487094",
  appId: "1:668079487094:web:03dc4e22a590799beb8757",
};

let FIREBASE_APP;
if (!getApps().length) {
  FIREBASE_APP = initializeApp(firebaseConfig);
} else {
  FIREBASE_APP = getApps()[0];
}

export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
