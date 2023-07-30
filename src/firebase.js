// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore,doc,setDoc} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbPtxcab6fWaHR2J5siajvlUkOsByBl0Q",
  authDomain: "financly-personal-trainer.firebaseapp.com",
  projectId: "financly-personal-trainer",
  storageBucket: "financly-personal-trainer.appspot.com",
  messagingSenderId: "282053996657",
  appId: "1:282053996657:web:84c1e71f05cebd92c2ebd0",
  measurementId: "G-JPMKY8ZVSX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {db,auth,provider,doc,setDoc};