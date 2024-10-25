// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYHpb8Q6dJLyt3MIJhDYEMDqTSIe74Tfg",
  authDomain: "bikerental360.firebaseapp.com",
  projectId: "bikerental360",
  storageBucket: "bikerental360.appspot.com",
  messagingSenderId: "240755382954",
  appId: "1:240755382954:web:c7c0984b44e6d544618ed3",
  measurementId: "G-JVRFVGP9F4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);