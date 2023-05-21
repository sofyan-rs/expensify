// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo4Z0qxJzp1t6IQei-4o70SSIAch2xOvI",
  authDomain: "expensify-7d8ae.firebaseapp.com",
  projectId: "expensify-7d8ae",
  storageBucket: "expensify-7d8ae.appspot.com",
  messagingSenderId: "379892932086",
  appId: "1:379892932086:web:9958cc8d47b628efeffbd7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const tripsRef = collection(db, 'trips');
export const expensesRef = collection(db, 'expenses');

export default app;