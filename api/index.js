const express = require("express");

const router = express.Router(); // create a new router object

const app = express();
const port = 3000;
const mysql = require('mysql');
let jwt = require("jsonwebtoken");

const { default: mongoose } = require("mongoose");

const JWT_SECRET = "secret";
const bodyParser = require("body-parser");

// let jsonParser = bodyParser.json();
// let urlencodedParser = bodyParser.urlencoded({ extended: false });
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


mongoose
	.connect(mongodbURI)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.log(`ERROR: ${  err}`);
	});
app.use(cors());
app.use(jsonParser);

// define a new route using the router object
const userRouter = require("./routes/Users");

app.use("/users", userRouter);
app.post('/userSignIn', (req, res) => {
    const { name,email, password } = req.body;
    const id=123
    const user = {id, name, password };
    const sqlInsert = 'INSERT INTO testUser SET ?';
    const checkUser = 'SELECT * FROM testUser WHERE name = ?';
    
    connection.query(checkUser, name, (err, result) => {
        if (err) throw err;
        console.log(result);
        if(result.length>0){
            res.send("User already exists");
        }
    });
    connection.query(sqlInsert, user, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('User added to database');
    });
});

app.post('/userLogin', (req, res) => {
    const { name, password } = req.body;
    const id=123
    const user = {id, name, password };
    const checkUser = 'SELECT * FROM testUser WHERE name = ?';
    connection.query(checkUser, name, (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result.length > 0) {
            if (result[0].password === password) {
                const token = jwt.sign({ id: result[0].id }, JWT_SECRET);
                res.json({ auth: true, token, result });
            } else {
                res.send("Wrong password");
            }
        } else {
            res.send("User does not exist");
        }
    });
});


app.get('/',(req,res)=>{
    res.json({
        msg:"Hello, U r in the home page",
    });
});


app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
})


const firebaseConfig = {
    apiKey: "AIzaSyDCuERAOIdoprb-tGaoaF4gBGsvvI9T9DA",
    authDomain: "auction-ac6ca.firebaseapp.com",
    projectId: "auction-ac6ca",
    storageBucket: "auction-ac6ca.appspot.com",
    messagingSenderId: "119876906482",
    appId: "1:119876906482:web:8bb5027344d50c0c47cf6b",
    measurementId: "G-J2QE686B86"
};