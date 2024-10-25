import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYHpb8Q6dJLyt3MIJhDYEMDqTSIe74Tfg",
  authDomain: "bikerental360.firebaseapp.com",
  projectId: "bikerental360",
  storageBucket: "bikerental360.appspot.com",
  messagingSenderId: "240755382954",
  appId: "1:240755382954:web:c7c0984b44e6d544618ed3",
  measurementId: "G-JVRFVGP9F4"
};

let app;
let auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  
  // Enable persistence to handle token refresh
  auth.setPersistence('local');
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { auth };
export default app;