var express = require('express');
var router = express.Router();
var config = require('../database/config').mysql_pool;
var moment = require('moment');
moment.locale("th");

/* GET user listing. */
router.get('/', function (req, res, next) {
  config.getConnection((err, connection) => {
    connection.query('SELECT * FROM work w JOIN user u on w.user_id = u.id WHERE u.id = ? ORDER BY w.status ASC, w.date_of_announce DESC ', 1, (err, rows) => {
      if (err) throw err;
      let title = "หน้าสมาชิก"
      let firstname = rows[0].firstname;
      let lastname = rows[0].lastname;
      let phone_number = rows[0].phone_number;
      let age = rows[0].age;
      let id_card = rows[0].id_card;
      res.render('user/index',
        { title: title, 
          card_data: rows, 
          firstname: firstname, 
          lastname: lastname, 
          phone_number: phone_number, 
          age: age, 
          id_card: id_card });
      connection.release();
    });
  })

});

router.get('/login', (req, res, next) => {
  let title = "เข้าสู่ระบบ|ผู้ประกาศงาน"
  res.render('form/login', { title: title });
});


module.exports = router;
