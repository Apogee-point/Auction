const express = require("express");

const firebase = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json"); // this is your firebase admin sdk private key

const router = express.Router(); // create a new router object

const app = express();
app.use(express.json());
const port = 3000;
const mysql = require('mysql');
const jwt = require("jsonwebtoken");
// const { default: admin } = require("firebase-admin");


const { default: mongoose } = require("mongoose");

const JWT_SECRET = "secret";
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const cors = require("cors");
const mongodbURI = require("./constants");
const { auth } = require("./middleware");


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ssai@12345',
    database: 'auctionDB'
});


connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ', err);
        return;
    }
    console.log('Connected to MySQL database!');
});


// mongoose
// 	.connect(mongodbURI)
// 	.then(() => {
// 		console.log("Connected to MongoDB");
// 	})
// 	.catch((err) => {
// 		console.log(`ERROR: ${  err}`);
// 	});
app.use(cors());
app.use(jsonParser);

// define a new route using the router object
const userRouter = require("./routes/Users");

app.use("/users", userRouter);




app.get('/',(req,res)=>{
    res.json({
        msg:"Hello, U r in the home page",
    });
});


app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
})
