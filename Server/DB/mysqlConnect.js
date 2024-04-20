const mysql = require('mysql2')

const mysqlConnect = async(user, pass) => {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: pass,
        database: 'auctionDB'
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected with mysql!");
    });
    // console.log("hi",con)
    return con
}


module.exports = mysqlConnect