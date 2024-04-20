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

router.get('/message', (req, res) => {
    res.send('Hello from the server!');
});


// route to insert user data into MySQL table

router.post('/userSignIn', (req, res) => {
    const { name,email, password } = req.body;
    const id=123
    const user = {id, name, password };
    const sqlInsert = 'INSERT INTO testUser SET ?';
    const checkUser = 'SELECT * FROM testUser WHERE name = ? and email = ?';
    
    connection.query(checkUser, [name,email], (err, result) => {
        if (err) throw err;
        // *console.log(result);
        if (result.length > 0) {
            res.send("User already exist");
        } else {
            connection.query(sqlInsert, user, (err, result) => {
                if (err) throw err;
                // *console.log(result);
                res.send('User added to database');
            });
        }
    });
});

app.post('/userLogin', (req, res) => {
    const { name, password } = req.body;
    const id=123
    const user = {id, name, password };
    const checkUser = 'SELECT * FROM testUser WHERE name = ?';
    connection.query(checkUser, name, (err, result) => {
        if (err) throw err;
        // *console.log(result);
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


module.exports = router;
