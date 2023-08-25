// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDirmAgdfHqTn2LVWiyfOblwVWpw2PuY10",
  authDomain: "ds-club-career-fair.firebaseapp.com",
  projectId: "ds-club-career-fair",
  storageBucket: "ds-club-career-fair.appspot.com",
  messagingSenderId: "956017103676",
  appId: "1:956017103676:web:ee9036719c72453b1d4439",
  measurementId: "G-65WQLNBLCR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// check if analytics is supported
let analytics = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const auth = getAuth(app);

const db = getFirestore(app);

export { app, analytics, auth, db };
