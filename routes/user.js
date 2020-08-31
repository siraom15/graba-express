var express = require('express');
var router = express.Router();

/* GET user listing. */
router.get('/', function (req, res, next) {
  let title = "หน้าสมาชิก"
  let username = "aommie"
  res.render('user/index', { title: title,username: username })
});

router.get('/login', (req, res, next) => {
  let title = "เข้าสู่ระบบ|ผู้ประกาศงาน"
  res.render('form/login', { title: title });
})

module.exports = router;
