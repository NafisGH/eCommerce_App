// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDkKrAM_rH0E8fwwdmpG5Gx8OPhwuTiywg",
  authDomain: "ecomerce-project-40a48.firebaseapp.com",
  projectId: "ecomerce-project-40a48",
  storageBucket: "ecomerce-project-40a48.appspot.com",
  messagingSenderId: "874009609927",
  appId: "1:874009609927:web:efb42b106139955432a0e2",
  measurementId: "G-KCG3D09TY3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);