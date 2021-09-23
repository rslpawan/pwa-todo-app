import firebase from 'firebase/compat/app';
import { getFirestore } from 'firebase/firestore';
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyALe9nO9_76PyAi8Tvr4OxuXk_4NeFu--U",
    authDomain: "pwa-app-c28bc.firebaseapp.com",
    projectId: "pwa-app-c28bc",
    storageBucket: "pwa-app-c28bc.appspot.com",
    messagingSenderId: "755473413087",
    appId: "1:755473413087:web:6ed84982bc0f07ca6d0a6a",
    measurementId: "G-2L709CQ9DW"
  };

firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore();

export default getFirestore();