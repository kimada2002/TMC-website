// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";  // Import Firebase Storage

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyANPwYzFjXWoHgAZjMEH0Sg753SCea2GZE",
    authDomain: "login-d61d3.firebaseapp.com",
    projectId: "login-d61d3",
    storageBucket: "login-d61d3.firebasestorage.app",
    messagingSenderId: "171041705788",
    appId: "1:171041705788:web:25f709eb7f5cb50a26d839",
    measurementId: "G-D0KSNNBW8Z",
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);  // Khởi tạo Firebase Storage

// Export tất cả các chức năng cần thiết
export { db, auth, storage, collection, getDocs };
