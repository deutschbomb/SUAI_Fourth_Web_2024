
const mysql = require('mysql2');

// пул для связи с БД
const pool = mysql.createPool({
    database: 'ticketdb',
    password: '68923071',
    connectionLimit: 3,
    port: '3306',
    host: 'localhost',
    user: 'root',
});

module.exports = pool;