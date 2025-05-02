import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyANPwYzFjXWoHgAZjMEH0Sg753SCea2GZE",
    authDomain: "login-d61d3.firebaseapp.com",
    projectId: "login-d61d3",
    storageBucket: "login-d61d3.firebasestorage.app",
    messagingSenderId: "171041705788",
    appId: "1:171041705788:web:25f709eb7f5cb50a26d839",
    measurementId: "G-D0KSNNBW8Z",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
