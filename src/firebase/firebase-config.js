// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPP3FziQGpt4oHxIf7BiNr0DHWfZu9fyo",
  authDomain: "pizzariaangular.firebaseapp.com",
  projectId: "pizzariaangular",
  storageBucket: "pizzariaangular.firebasestorage.app",
  messagingSenderId: "354648513218",
  appId: "1:354648513218:web:39cd03a7f211c45b6cf95b",
  measurementId: "G-VQ485M87Y3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);