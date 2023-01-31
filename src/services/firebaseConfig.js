// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeN7LJcOofBVlCBFaLzm_3Oe4KdcuqxQY",
  authDomain: "burger-builder-afe3b.firebaseapp.com",
  databaseURL: "https://burger-builder-afe3b-default-rtdb.firebaseio.com",
  projectId: "burger-builder-afe3b",
  storageBucket: "burger-builder-afe3b.appspot.com",
  messagingSenderId: "987857243386",
  appId: "1:987857243386:web:c407e1d24af81e5bf58d43",
  measurementId: "G-6PTTXLFWKE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
