import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyABnOPRnvt4-NY2SQc9PKBvf1NMgWmk9Z8",
  authDomain: "miniblog-a8757.firebaseapp.com",
  projectId: "miniblog-a8757",
  storageBucket: "miniblog-a8757.appspot.com",
  messagingSenderId: "701789288418",
  appId: "1:701789288418:web:bdb9ca79c445be93a52bbb"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db}