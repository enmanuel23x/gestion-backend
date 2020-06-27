//NPM requires
const mysql = require('mysql');
const { promisify } = require('util');

//Project's own requires
const database  = require('./config/config').database;
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if(err === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TOO MANY CONNECTIONS');
        }
        if(err === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if(connection) connection.release();
    console.log('DB is connected');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;