require('dotenv').config();
const express = require("express");
const firebase = require("firebase-admin");
const fs = require('fs');
fs.mkdirSync('uploads', { recursive: true });
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require("cors");
const app = express();
app.use(cors());
app.use(jsonParser);
app.use(urlencodedParser);
app.use('/uploads', express.static('uploads'));
app.use(express.json());


// controllers
const { login, signup ,getMe} = require('./controllers/users')
const {search, deleteAll } = require('./controllers/items')

//routes
const itemRouter = require('./Routes/items');
const userRouter = require('./Routes/users');

const auth = require("./middleware/auth");

app.get('/',(req,res)=>{ res.json({msg:"Hello, I am underwater"});});
app.post('/login', login);
app.post('/signup', signup);
app.post('/searchItems', auth, search)
app.get('/deleteAll', deleteAll);
//middlewares 

app.use(auth)
app.use('/users', userRouter)
app.use('/items', itemRouter)

//! myself
app.get('/me',getMe)

const port = process.env.PORT || 3000
const mysqlConnect = require('./DB/mysqlConnect')
const mongoConnect = require('./DB/mongoConnect')
const start = async () =>{
    try{
        const conn = await mysqlConnect(process.env.SQL_ID, process.env.SQL_PASS);
        // console.log(conn)
        await mongoConnect(process.env.MONGO_URI);
        console.log('Connected to Mongoose Database and Mysql Database Sucessfully');
        app.listen(port, console.log(`Server is active and listening on port ${port}`));
    }
    catch(error){
        console.log(error);
    }
    console.log("Hello server sent this message")
}

start();