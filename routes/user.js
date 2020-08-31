var express = require('express');
var router = express.Router();

/* GET user listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', (req, res, next) => {
  let title = "เข้าสู่ระบบ|ผู้ประกาศงาน"
  res.render('form/login', { title: title });
})

module.exports = router;
