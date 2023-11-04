const firebaseapp = require("firebase");

const firebaseConfig=require("./constants");
firebaseapp.initializeApp(firebaseConfig);

const db=firebaseapp.firestore();