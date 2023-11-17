// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfNB61A_21dVOBFWS1i54cB06Zm0QbAYM",
  authDomain: "gx3-expiry-date-checker.firebaseapp.com",
  projectId: "gx3-expiry-date-checker",
  storageBucket: "gx3-expiry-date-checker.appspot.com",
  messagingSenderId: "685683536002",
  appId: "1:685683536002:web:1d2967f7a4dd0bba30049b",
  measurementId: "G-4VXQKH49QP",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
