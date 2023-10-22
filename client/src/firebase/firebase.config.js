// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
require("dotenv").config();

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// API KEY
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: API_KEY,

  authDomain: "dw-estates.firebaseapp.com",

  projectId: "dw-estates",

  storageBucket: "dw-estates.appspot.com",

  messagingSenderId: "873191951917",

  appId: "1:873191951917:web:e15a9129c92270654d72a4",
};

// Initialize Firebase

export const firebase = initializeApp(firebaseConfig);
