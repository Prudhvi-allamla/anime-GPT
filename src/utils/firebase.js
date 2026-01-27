// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHFixpX0OV3ZQaogm2wYPqhyl3VEV_oZ0",
  authDomain: "animegpt-b36bc.firebaseapp.com",
  projectId: "animegpt-b36bc",
  storageBucket: "animegpt-b36bc.firebasestorage.app",
  messagingSenderId: "907067307586",
  appId: "1:907067307586:web:da2d0c1ca2dd271ab79fdb",
  measurementId: "G-4YYXEZ7V6E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();