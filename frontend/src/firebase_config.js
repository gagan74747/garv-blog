// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmP-5V5jFAAMLnUtlwdGALcwZKEdeyfCo",
  authDomain: "blog-ttn.firebaseapp.com",
  projectId: "blog-ttn",
  storageBucket: "blog-ttn.appspot.com",
  messagingSenderId: "759286654388",
  appId: "1:759286654388:web:224d45bc59c3720579fee1",
  measurementId: "G-RV2T94YSPQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
