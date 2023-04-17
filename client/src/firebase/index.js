// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import firebase from "firebase";
import { FirebaseStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_XwArAVLuNLR_wNs2Kql1oLTTmMBuFKc",
  authDomain: "tutorfinder-f1af6.firebaseapp.com",
  databaseURL: "https://tutorfinder-f1af6-default-rtdb.firebaseio.com",
  projectId: "tutorfinder-f1af6",
  storageBucket: "tutorfinder-f1af6.appspot.com",
  messagingSenderId: "498416198124",
  appId: "1:498416198124:web:c0cabec30e9421fb6e60c9",
  measurementId: "G-06T6SEGRSG"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const mStorage = firebase.storage();

export default mStorage;
