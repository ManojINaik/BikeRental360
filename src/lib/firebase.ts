import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  browserLocalPersistence, 
  setPersistence,
  GithubAuthProvider
} from "firebase/auth";

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
const auth = getAuth(app);

// Set persistence to local
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Error setting auth persistence:", error);
});

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize GitHub Auth Provider
const githubProvider = new GithubAuthProvider();
githubProvider.addScope('user');
githubProvider.setCustomParameters({
  prompt: 'consent'
});

export { auth, googleProvider, githubProvider };
export default app;