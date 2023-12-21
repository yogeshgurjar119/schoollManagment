let mysql = require('mysql2')
require('dotenv').config()



let connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "school",
    connectionLimit : 10
    // multipleStatements: true
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }else{
       console.log('Connected to the MySQL server.');
    } 
  });
module.exports = connection