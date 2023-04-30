import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDrfpU2_1oSolJhnRGZaoduMG0FvexqYpU",
  authDomain: "hashcode-45476.firebaseapp.com",
  projectId: "hashcode-45476",
  storageBucket: "hashcode-45476.appspot.com",
  messagingSenderId: "620445453390",
  appId: "1:620445453390:web:b2662969d88fc60914471f",
  measurementId: "G-BB82X0K7MB"
};

// Initialize Firebase


export const googleProvider = new GoogleAuthProvider();
export const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

