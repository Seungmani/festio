// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Firestore를 사용하는 경우


const firebaseConfig = {
  apiKey: process.env.React_APP_apiKey,
  authDomain: process.env.React_APP_authDomain,
  projectId: process.env.React_APP_projectId,
  storageBucket: process.env.React_APP_storageBucket,
  messagingSenderId: process.env.React_APP_messagingSenderId,
  appId: process.env.React_APP_appId,
  measurementId: process.env.React_APP_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase Auth 및 Firestore 인스턴스 생성
export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore를 사용하는 경우