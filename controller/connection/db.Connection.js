const mysql = require('mysql')

const dbConn = mysql.createConnection({
    host: 'localhost',
    database: 'db_Inventory',
    user: 'root',
    password: 'tunxiex'
})

dbConn.query('SELECT "Database connected" result', (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result[0].result);
})

module.exports = dbConn