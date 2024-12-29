// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVuShK40sRFihNeoypeNvZJMVw1Q2TyTQ",
  authDomain: "waqarauthentication.firebaseapp.com",
  projectId: "waqarauthentication",
  storageBucket: "waqarauthentication.appspot.com",
  messagingSenderId: "1086505485402",
  appId: "1:1086505485402:web:5fda7577ba5dae5a348463",
  measurementId: "G-N9YQ2160G9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { analytics, auth, firestore, storage }
