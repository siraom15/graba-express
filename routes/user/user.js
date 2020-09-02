var express = require('express');
var router = express.Router();
var con = require('../../database/connect');
var moment = require('moment');
var crypto = require('crypto');
moment.locale("th");

/* GET user listing. */
router.get('/', function (req, res, next) {
  if (!req.session.loggedin) {
    res.redirect('/user/login')
  } else {
    let sql = `SELECT * FROM work w JOIN user u on w.user_id = u.id WHERE u.id = ? ORDER BY w.status ASC, w.date_of_announce DESC `;
    con.query(sql, req.session.userid, (err, rows) => {
      if (err) throw err;
      let title = "หน้าสมาชิก"
      let firstname = rows[0].firstname;
      let lastname = rows[0].lastname;
      let phone_number = rows[0].phone_number;
      let age = rows[0].age;
      let id_card = rows[0].id_card;
      res.render('user/index',
        {
          title: title,
          loggedin : true,
          card_data: rows,
          firstname: firstname,
          lastname: lastname,
          phone_number: phone_number,
          age: age,
          id_card: id_card
        });
    });
  }
});
 
router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/user/login')
});

module.exports = router;
