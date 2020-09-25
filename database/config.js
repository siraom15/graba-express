const mysql = require('mysql');

var config;
config = {
  // mysql_pool_p: mysql.createPool({
  //   host : 'localhost',
  //   user : 'root',
  //   password : 'root',
  //   database : 'graba-express'
  // }),
  mysql_pool : mysql.createPool({
    host : 'remotemysql.com',
    port : 3306,
    user : '7QJ7di4FCz',
    password : '9By4af7dAm',
    database : '7QJ7di4FCz'
  })
};
module.exports = config;
