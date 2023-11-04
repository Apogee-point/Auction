const express = require('express');

const router = express.Router();
const mysql = require('mysql');

// create connection to MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ssai@12345',
    database: 'auctionDB'
});

// route to insert user data into MySQL table
router.post('/users', (req, res) => {
    const { name, email, password } = req.body;
    const id=123
    const user = { id,name, password };
    const sql = 'INSERT INTO testUser SET ?';
    connection.query(sql, user, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('User added to database');
    });
});

module.exports = router;
