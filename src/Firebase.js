// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvnbtRJcILpAuoWU4Ep8SxJFSMqtxWDfg",
  authDomain: "fir-practice-1de93.firebaseapp.com",
  projectId: "fir-practice-1de93",
  storageBucket: "fir-practice-1de93.firebasestorage.app",
  messagingSenderId: "247573368384",
  appId: "1:247573368384:web:98384eee5fd80bcfcbd9a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
 export const auth = getAuth(app);