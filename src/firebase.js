import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7WvWDF9er3GudHT9f_N3RnGhiQosA4Rk",
  authDomain: "ideeninsel-v2.firebaseapp.com",
  projectId: "ideeninsel-v2",
  storageBucket: "ideeninsel-v2.firebasestorage.app",
  messagingSenderId: "485152286155",
  appId: "1:485152286155:web:a52d7b4bfc6519cae5824e",
  measurementId: "G-F9VBSTJ5M1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);

export { app, analytics };
