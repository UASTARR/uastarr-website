import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import dotenv from 'dotenv';
dotenv.config();

const config = {
    apiKey: process.env.firebase_apiKey,
    authDomain: process.env.firebase_authDomain,
    projectId: process.env.firebase_projectId,
    storageBucket: process.env.firebase_storageBucket,
    messagingSenderId: process.env.firebase_messagingSenderId,
    appId: process.env.firebase_appId,
};

Object.keys(config).forEach((key) => {
  const configValue = config[key] + "";
  if (configValue.charAt(0) === '"') {
      config[key] = configValue.substring(1, configValue.length - 1);
  }
});

export const firebaseConfig = config;

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const firestoreDb = getFirestore(firebaseApp);