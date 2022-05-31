// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpaT_FH5iPe7ySRQKSu_E2Jkxk7SMkEqo",
  authDomain: "instagram-clone-95039.firebaseapp.com",
  projectId: "instagram-clone-95039",
  storageBucket: "instagram-clone-95039.appspot.com",
  messagingSenderId: "666419900357",
  appId: "1:666419900357:web:e737c5bc24eee0411365ac",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
