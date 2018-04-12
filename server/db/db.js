var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 50,
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'qq'
});

async function query(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if (error) {
                reject(error);
            } else {
                connection.query(sql, values, function (error, results, fields) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                    connection.release();
                });
            }
        });
    });
}
module.exports = query;
