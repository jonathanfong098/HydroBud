import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyBcgWqSsPtGX768mAM8Tkbr_L_WlIayWGU",
  authDomain: "hydrobud-37132.firebaseapp.com",
  projectId: "hydrobud-37132",
  storageBucket: "hydrobud-37132.appspot.com",
  messagingSenderId: "564197058070",
  appId: "1:564197058070:web:e197064a5fd8bf72ccf737"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(firebaseApp)
const firebaseDB = getFirestore(firebaseApp)

export { firebaseAuth, firebaseDB }
export default firebaseApp