import firebase from "firebase/compat/app";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfo5K26-R_WSa_k0UdphqLiO-vqZjrcp0",
  authDomain: "ztrade-5408f.firebaseapp.com",
  projectId: "ztrade-5408f",
  storageBucket: "ztrade-5408f.appspot.com",
  messagingSenderId: "479071631116",
  appId: "1:479071631116:web:817140fd8d4b9446c23b29",
};

const app = firebase.initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const twitterProvider = new TwitterAuthProvider();

export const db = firebase.firestore(app);
