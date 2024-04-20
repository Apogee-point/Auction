import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDCuERAOIdoprb-tGaoaF4gBGsvvI9T9DA",
    authDomain: "auction-ac6ca.firebaseapp.com",
    projectId: "auction-ac6ca",
    storageBucket: "auction-ac6ca.appspot.com",
    messagingSenderId: "119876906482",
    appId: "1:119876906482:web:8bb5027344d50c0c47cf6b",
    measurementId: "G-J2QE686B86"
  };

const app = initializeApp(firebaseConfig);


export const db=getFirestore(app);

export const auth = getAuth(app);