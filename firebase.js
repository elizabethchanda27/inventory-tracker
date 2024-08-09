// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX7U4Rzfgx-PTlBu_27DFTw2WJarc1-Wg",
  authDomain: "inventory-management-39e28.firebaseapp.com",
  projectId: "inventory-management-39e28",
  storageBucket: "inventory-management-39e28.appspot.com",
  messagingSenderId: "1018354368112",
  appId: "1:1018354368112:web:5b7a3438f57dd1486dbeb5",
  measurementId: "G-3JR4WFV7JC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Access firestore files
export {firestore};