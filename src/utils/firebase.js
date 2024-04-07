// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAdvESHmZZtdcXZGPUo5XOnOaC98RLc23A",
    authDomain: "netflixgpt-6c4b1.firebaseapp.com",
    projectId: "netflixgpt-6c4b1",
    storageBucket: "netflixgpt-6c4b1.appspot.com",
    messagingSenderId: "23689978123",
    appId: "1:23689978123:web:626d750c2fbdb316c7c20e",
    measurementId: "G-Y4G2J39ENF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();