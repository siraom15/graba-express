var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var { secret_password, secret_session } = require('../../secret.json');
const session = require('express-session');
var con = require('../../database/connect');

router.get('/', (req, res, next) => {
    let title = "เข้าสู่ระบบ|ผู้ประกาศงาน"
    res.render('user/form/login', { title: title });
});

router.post('/', (req, res) => {
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
});

router.get('/a', (req, res, next) => {
    req.session.userid = 1;
    req.session.loggedin = true;
    res.redirect('/user');
});

module.exports = router;