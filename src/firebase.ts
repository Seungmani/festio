import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

interface FirebaseProps {
  apiKey: string | undefined
  authDomain:string | undefined
  projectId: string | undefined
  storageBucket: string | undefined
  messagingSenderId: string | undefined
  appId: string | undefined
  measurementId: string | undefined
}

const firebaseConfig: Readonly<FirebaseProps> = {
  apiKey: String(import.meta.env.VITE_apiKey),
  authDomain: String(import.meta.env.VITE_authDomain),
  projectId: String(import.meta.env.VITE_projectId),
  storageBucket: String(import.meta.env.VITE_storageBucket),
  messagingSenderId: String(import.meta.env.VITE_messagingSenderId),
  appId: String(import.meta.env.VITE_appId),
  measurementId: String(import.meta.env.VITE_measurementId),
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth 및 Firestore 인스턴스 생성
export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore를 사용하는 경우