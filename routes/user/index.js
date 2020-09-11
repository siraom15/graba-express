var express = require('express');
var router = express.Router();
var con = require('../../database/connect');
var moment = require('moment');
moment.locale("th");

//  we edit on (host)/user

// now 
router.get('/', function (req, res, next) {
  // identify user
  if (!req.session.loggedin) {
    res.redirect('/user/login')
  } else {
    let sql = `SELECT * FROM user WHERE id = ? `;
    con.query(sql, req.session.userid, (err, rows) => {
      if (err) console.log(err);
      let title = "หน้าสมาชิก"
      // defined sql code that select all data of work
      let sql2 = `
        SELECT w.*,
        p1.name_th AS province_start_name ,
        a1.name_th AS amphure_start_name,
        d1.name_th AS district_start_name,
        
        p2.name_th AS province_destination_name ,
        a2.name_th AS amphure_destination_name,
        d2.name_th AS district_destination_name,
        wl.*,
        u.firstname,
        u.lastname,
        u.picture_path,
        u.random_user_id 
        FROM work w 

        JOIN work_location wl on wl.work_id = w.id
        JOIN provinces p1 on wl.province_start_id = p1.id
        JOIN amphures a1 on wl.amphure_start_id = a1.id
        JOIN districts d1 on wl.district_start_id = d1.id
        JOIN provinces p2 on wl.province_destination_id = p2.id
        JOIN amphures a2 on wl.amphure_destination_id = a2.id
        JOIN districts d2 on wl.district_destination_id = d2.id
        JOIN user u on w.user_id = u.id 

        WHERE u.id = ?
 
        ORDER BY w.status ASC, w.date_of_announce DESC`;

      con.query(sql2, [req.session.userid], (err, rows2) => {
        // check if they already announce work, we will return data to them
        if (rows2.length > 0) {
          res.render('user/index',
            {
              title: title,
              loggedin: true,
              user_data : rows,
              card_data: rows2
            });
        } 
        // else we render with no data
        else {
          res.render('user/index',
            {
              title: title,
              loggedin: true,
              user_data : rows,
              card_data: null
            });
        }
      });
    });
  }
});

// logout 
router.get('/logout', (req, res, next) => {
  // destroy session
  req.session.destroy();
  // redirect to login
  res.redirect('/user/login')
});

module.exports = router;
