var express = require('express');
var router = express.Router();
var moment = require('moment');
var con = require('../../database/connect');
// const dateTime = require('../../function/getTime');
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
    if (!req.session.loggedin) {
        res.redirect('/user/login');
    }
    else {
        // 
        let regEx = /(\d{4})-(\d{2})-(\d{2})T(\d+):(\d+):(\d+)/;

        let x = moment().format().match(regEx);

        let date = x.slice(1, 4).join("-");
        let time = x.slice(4).join(":");
        let dateTime = date + " " + time;

        let data = {
            userid: req.session.userid,
            date_of_announce: dateTime,
            province_start: parseInt(req.body.province_start),
            amphure_start: parseInt(req.body.amphure_start),
            district_start: parseInt(req.body.district_start),
            province_destination: parseInt(req.body.province_destination),
            amphure_destination: parseInt(req.body.amphure_destination),
            district_destination: parseInt(req.body.district_destination),
            goods: req.body.goods,
            weight: req.body.weight,
            rate_of_price: req.body.rate_of_price,
            date_of_work: req.body.date_of_work,
            information: req.body.information,
            submit: req.body.submit,
            status: 0
        }
        var sql = `INSERT INTO work (user_id, date_of_announce, goods, rateOfPrice, weight, information, status, date_of_work) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        con.query(sql, [data.userid, data.date_of_announce, data.goods, data.rate_of_price, data.weight, data.information, data.status, data.date_of_work],
            (err, result) => {
                if (err) throw err;
                if (result.insertId) {
                    let insertId = result.insertId;
                    var sql2 = `INSERT INTO work_location (work_id, province_start_id, amphure_start_id, district_start_id, province_destination_id, amphure_destination_id, district_destination_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;
                    con.query(sql2,
                        [insertId, data.province_start, data.amphure_start,
                            data.district_start, data.province_destination,
                            data.amphure_destination, data.district_destination
                        ],
                        (err, result2) => {
                            if (err) throw err;
                            res.redirect('/work/info/' + insertId + "?inserted_status=success");
                        })
                } else {
                    res.redirect('/')
                }
            });
    }
});

module.exports = router;