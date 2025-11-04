// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyBQNQ6o9nsVRoh4bIgEBE1liO1ewBziLbU",
  authDomain: "dswfinal-79c98.firebaseapp.com",
  projectId: "dswfinal-79c98",
  storageBucket: "dswfinal-79c98.firebasestorage.app",
  messagingSenderId: "239466656508",
  appId: "1:239466656508:web:4dc2b19a70ba02ff3c1d79",
  measurementId: "G-SC53X4R1YN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);