// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfJBCypBHf6WJEJG3gDSvgHn-OhDPatR4",
  authDomain: "la-crypta---lottery.firebaseapp.com",
  projectId: "la-crypta---lottery",
  storageBucket: "la-crypta---lottery.appspot.com",
  messagingSenderId: "731136255268",
  appId: "1:731136255268:web:3b2c11b033612f1634ffb1",
  measurementId: "G-D4S09T075Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, onSnapshot, doc, getDoc, getDocs };
