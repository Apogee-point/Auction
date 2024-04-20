const express = require('express');

const router = express.Router();
const mysql = require('mysql');

router.get('/items', async (req, res) => {
    try {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'car_auction',
        });

        connection.connect();

        const query = 'SELECT * FROM items';

        connection.query(query, (error, results, fields) => {
            if (error) throw error;
            res.send(results);
        });

        connection.end();
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});


