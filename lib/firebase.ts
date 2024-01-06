import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDRGc_SMuHmc--1dIEddrHm0GYI8olkBcU",
    authDomain: "watch-party-63833.firebaseapp.com",
    projectId: "watch-party-63833",
    storageBucket: "watch-party-63833.appspot.com",
    messagingSenderId: "1060646797191",
    appId: "1:1060646797191:web:796dcbf95fb3a49eef9d22",
    measurementId: "G-6WV6CLPGYE",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
