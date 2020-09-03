const mysql = require('mysql');

var config;
config = {
  mysql_pool: mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'graba-express'
  })
  // ,mysql_def : mysql.createConnection({
  //   host : 'localhost',
  //   user : 'root',
  //   password : 'root',
  //   database : 'graba-express'
  // })
};
module.exports = config;
