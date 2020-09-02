var express = require('express');
var router = express.Router();
var moment = require('moment');
var con = require('../../database/connect');

router.get('/', (req, res, next) => {
    if (!req.session.loggedin) {
        res.redirect('/user/login');
    }
    else {
        let sql = `SELECT * FROM user WHERE id = ? `;
        con.query(sql, req.session.userid, (err, rows) => {
            if (err) throw err;
            let title = "ประกาศงาน"
            let firstname = rows[0].firstname;
            let lastname = rows[0].lastname;
            let phone_number = rows[0].phone_number;
            let age = rows[0].age;
            let id_card = rows[0].id_card;

            var sql_province = 'select * from provinces';
            con.query(sql_province, (err, province_data) => {
                if (err) throw err;
                res.render('user/announce', {
                    title: title,
                    loggedin: true,
                    card_data: rows,
                    firstname: firstname,
                    lastname: lastname,
                    phone_number: phone_number,
                    age: age,
                    id_card: id_card,
                    province_data: province_data
                });
            });

            // con.release();
        });
    }
});
router.post('/', (req, res, next) => {
});

module.exports = router;