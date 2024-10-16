import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";         
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "sumit-s-project-4da32.firebaseapp.com",
  projectId: "sumit-s-project-4da32",
  storageBucket: "sumit-s-project-4da32.appspot.com",
  messagingSenderId: "241936150229",
  appId: "1:241936150229:web:21f94ab73a6870ecbabc5c",
  measurementId: "G-MEDK6YFCN5"
};

const app = initializeApp(firebaseConfig);

isSupported().then((yes) => {
    if (yes) {
      const analytics = getAnalytics(app);
    } else {
      console.log("Firebase Analytics is not supported in this environment.");
    }
  }).catch((error) => {
    console.error("Error checking analytics support:", error);
  });
  

const auth = getAuth(app);      
const db = getFirestore(app);        

export { auth, db };