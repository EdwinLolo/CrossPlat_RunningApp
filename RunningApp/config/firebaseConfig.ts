// src/config/firebaseConfig.ts
import { initializeApp, getApps } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import "firebase/compat/storage";

// INI API KEY GABUNG DENGAN UTS LAB
const firebaseConfig = {
  apiKey: "AIzaSyD8smnOc3GEi9zu5FopFsICMeVUwnk8wMc",
  authDomain: "edwinfedoralolouts.firebaseapp.com",
  projectId: "edwinfedoralolouts",
  storageBucket: "edwinfedoralolouts.appspot.com",
  messagingSenderId: "742493209788",
  appId: "1:742493209788:web:e8e76b4f26bf20d83a3cb9",
  measurementId: "G-4PH087HKTR",
};

// INI API KEY GK TAU PUNYA SIAPA
// const firebaseConfig = {
//   apiKey: "AIzaSyCXLaaPEKyT5bW6xmPnEh8VQ0UhaxjBvT4",
//   authDomain: "crossplatrunningapp-85415.firebaseapp.com",
//   projectId: "crossplatrunningapp-85415",
//   storageBucket: "crossplatrunningapp-85415.firebasestorage.app",
//   messagingSenderId: "97169356305",
//   appId: "1:97169356305:web:e52d43691611b12f21a3b0",
// };

// INI API KEY GABUNG DENGAN UTS LECTURER
// const firebaseConfig = {
//   apiKey: "AIzaSyA7W12MBd88XeGaZClrRyVyPzLLW2awhiE",
//   authDomain: "runningappmap-e6423.firebaseapp.com",
//   projectId: "runningappmap-e6423",
//   storageBucket: "runningappmap-e6423.appspot.com",
//   messagingSenderId: "668079487094",
//   appId: "1:668079487094:web:03dc4e22a590799beb8757",
// };

let FIREBASE_APP;
if (!getApps().length) {
  FIREBASE_APP = initializeApp(firebaseConfig);
} else {
  FIREBASE_APP = getApps()[0];
}

export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
