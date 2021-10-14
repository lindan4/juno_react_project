// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnuLhAlhS5LOWcBRVkffThsWZl4-C_nBA",
  authDomain: "juno-react-proj-meal.firebaseapp.com",
  projectId: "juno-react-proj-meal",
  storageBucket: "juno-react-proj-meal.appspot.com",
  messagingSenderId: "1062769252048",
  appId: "1:1062769252048:web:8ab64364b18bdc1694b0d5",
  measurementId: "G-FPJDK6F56S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app