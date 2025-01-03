// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    User,
 } from "firebase/auth";
 import { getFunctions } from "firebase/functions";


const firebaseConfig = {
  apiKey: "AIzaSyBN5vzzbqvIBOwU44dOBBuLkypezu7Rp7Y",
  authDomain: "yt-clone-a3589.firebaseapp.com",
  projectId: "yt-clone-a3589",
  appId: "1:174076657354:web:73a62f75fc3ed375edfe33",
  measurementId: "G-273MXGSH9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export const functions = getFunctions();

/**
 * Signs the user in with a Google popup.
 * @returns A promise that resolves with the user's credentials.
 */
export function signInWithGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

/**
 * Signs the user out.
 * @returns A promise that resolves when the user is signed out.
 */
export function signOut() {
  return auth.signOut();
}

/**
 * Trigger a callback when user auth state changes.
 * @returns A function to unsubscribe callback.
 */
export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
