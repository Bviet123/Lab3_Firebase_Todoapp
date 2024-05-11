//import firebase from 'firebase/app';
//import 'firebase/auth';
//import 'firebase/database';
//import 'firebase/firestore';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhbcv5WqAWLlMq0Z6zRdoaDeN54zuWfxY", 
  authDomain: "lab3-d455f.firebaseapp.com", 
  projectId: "lab3-d455f", 
  storageBucket: "lab3-d455f.appspot.com", 
  messagingSenderId: " ", 
  appId: "1:524061473961:android:2f53dc9a14b32c2023bdb8", 
};

//firebase.initializeApp(firebaseConfig);

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
