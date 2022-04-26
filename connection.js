const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.MYSQL_DB_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB_NAME
    },
    console.log(`Connected to the database.`)
);

module.exports = db;