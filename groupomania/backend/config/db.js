require('dotenv').config();
const mysql = require("mysql");

//Connexion to phpmyadmin database with .env security//
const db = mysql.createConnection({
    host : `SECRET_HOST`,
    user : `SECRET_USER`,
    password : `SECRET_PASSWORD`,
    database : `SECRET_DB`
});

module.exports.getDB = () => {
    return db
};