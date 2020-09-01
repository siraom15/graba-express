var express = require('express');
var router = express.Router();
var con = require('../database/config').mysql_pool;
var moment = require('moment');
var crypto = require('crypto');

moment.locale("th");

var { secret_password, secret_session } = require('../secret.json');
// auto reconnect database
con.getConnection((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + con.threadId);
})
con.on('error', function (err) {
  console.log('caught this error: ' + err.toString());
});
function handleDisconnect(conn) {
  conn.on('error', function (err) {
    if (!err.fatal) {
      return;
    }
    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }

    console.log('Re-connecting lost connection: ' + err.stack);

    connection = mysql.createPool(conn.config);
    handleDisconnect(connection);
    connection.getConnection();
  });
}
handleDisconnect(con);


/* GET user listing. */
router.get('/', function (req, res, next) {
  if (!req.session.loggedin) {
    res.redirect('/user/login')
  } else {
    con.query('SELECT * FROM work w JOIN user u on w.user_id = u.id WHERE u.id = ? ORDER BY w.status ASC, w.date_of_announce DESC ', req.session.userid, (err, rows) => {
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
          card_data: rows,
          firstname: firstname,
          lastname: lastname,
          phone_number: phone_number,
          age: age,
          id_card: id_card
        });
      // con.release();
    });
  }
});

router.get('/login', (req, res, next) => {
  let title = "เข้าสู่ระบบ|ผู้ประกาศงาน"
  res.render('user/form/login', { title: title });
});

router.post('/login', (req, res) => {
  var phone_number = req.body.phone_number;
  var password = req.body.password;
  if (phone_number && password) {
    let hash_password = crypto.createHmac('sha256', secret_password).update(password).digest('hex');
    con.query("SELECT * FROM user WHERE phone_number = ? AND password = ?", [phone_number, hash_password], (err, results) => {
      if (err) {
        console.log(err);
        res.render('user/form/login', { title: 'เข้าสู่ระบบ', err: "Server ยังไม่ได้เชื่อม Database" });
      }
      else if (results.length > 0) {
        console.log(results);
        req.session.loggedin = true;
        req.session.userid = results[0].id;
        res.redirect('/user');
      } else {
        res.render('user/form/login', { title: 'เข้าสู่ระบบ', err: "เบอร์โทรหรือรหัสผ่านผิด" })
      }
    });

  } else {
    res.render('user/form/login', { title: 'เข้าสู่ระบบ', err: "กรุณากรอกให้ครบถ้วน" })
  }
})
router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/user/login')
});
module.exports = router;
