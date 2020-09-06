var express = require('express');
var router = express.Router();
var crypto = require('crypto');
const { secret_password, secret_session, secret_announce } = require('../../secret.json');
const session = require('express-session');
var con = require('../../database/connect');

//  we edit on (host)/login

// render login 
router.get('/', (req, res, next) => {
    let title = "สมัครสมาชิก|ผู้ประกาศงาน"
    res.render('user/form/sign-up', { title: title });
});

// if we have data from user forms
router.post('/', (req, res) => {
    var phone_number = req.body.phone_number;
    var password = req.body.password;
   
});

module.exports = router;