import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDJR6o6u3-ozryypnRZ-EjNsNwjQbmExw",
  authDomain: "task-manager-df89f.firebaseapp.com",
  projectId: "task-manager-df89f",
  storageBucket: "task-manager-df89f.firebasestorage.app",
  messagingSenderId: "446608683457",
  appId: "1:446608683457:web:5538383629d24c3d27ff40",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
export const auth = getAuth(app);

// db
export const db = getFirestore(app);
