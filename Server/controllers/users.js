const User = require('../models/User')
const jwt = require('jsonwebtoken');

const mysql = require('mysql2')
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ssai@12345',
  database: 'auctionDB'
});

conn.connect((err) => {
  if (err) {
      console.error('Error connecting to MySQL database: ', err);
      query = " Create table Transactions ("
      return;
  }
  console.log('Connected to MySQL database!');
});

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
        email: email,
        });
        if (!user) {
        return res.status(403).json({ msg: "User not found" });
        }
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
        return res.status(403).json({ msg: "Incorrect password" });
        }

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET);
        res.status(200).json({message: "Logged in successfully!",token: token});
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
    }
}

const signup = async (req, res) => {
    const { name, email, address, password } = req.body;
    try{
        const doesEmailExist = await User.findOne({ email:email });
        if(doesEmailExist){
            return res.status(400).json({ msg: 'Email already exists' });
        }
  
        const newUser = new User({
            name: name,
            email: email,
            address: address,
            password: password,
        });
  
        await newUser.save();
        res.status(201).json({ msg: 'User created successfully!' });
    }catch(err){
        console.log(err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

const showData = async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findOne({ _id: id });
      if (!user) {
        // No user found with the given ID, return a 404 response
        return res.status(404).send('User not found');
      }
      res.json({ user:user });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
}

// const getFcmToken = async (req, res) => { 
//     const { fcmToken } = req.body;
//     const user = await User.findOne({ _id: req.userId });
//     const user_id=req.userId;
//     user.fcmToken = fcmToken;
//     const query = 'INSERT INTO notif (fcm,user_id) VALUES (?,?)'
//     conn.query(query,[fcmToken,user_id],(error,results)=>{
//         if(error){
//             console.log(error);
//         }
//         else {
//         res.status(200).send('Data inserted successfully');
//         }
//     })
//     await user.save();
//     res.status(200).send('FCM Token saved successfully');
// }

const getMe =  async (req, res) => {
    const user = await User.findOne({ _id: req.userId });
    // console.log(user);
    return res.json({user:user});
  }
module.exports = { login, signup, showData,getMe} //! try to export fcm token