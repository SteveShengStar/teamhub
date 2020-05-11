const db = {};
const mysql = require('mysql');

db.connected = false;

db.init = async (dbConfig) => {
    db.connection = mysql.createConnection(dbConfig);
    db.connection.connect();
    db.connected = true;
    console.log(`Connected to: ${dbConfig.host}`);
};

db.query = (sql, args) => {
    return new Promise((resolve, reject) => {
        db.connection.query(sql, args, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};

db.close = () => {
    return new Promise((resolve, reject) => {
        db.db.end(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};

module.exports = db;