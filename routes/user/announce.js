var express = require('express');
var router = express.Router();
var moment = require('moment');
var con = require('../../database/connect');
var crypto = require('crypto');
const { secret_password, secret_session, secret_announce } = require('../../secret.json');

router.get('/', (req, res, next) => {
    // check identified 
    if (!req.session.loggedin) {
        res.redirect('/user/login');
    }
    else {
        let sql = `SELECT * FROM user WHERE id = ? `;
        let userid = req.session.userid;

        // get user information
        con.query(sql, userid, (err, rows) => {
            if (err) throw err;
            let title = "ประกาศงาน"
            let firstname = rows[0].firstname;
            let lastname = rows[0].lastname;
            let phone_number = rows[0].phone_number;
            let age = rows[0].age;
            let id_card = rows[0].id_card;

            //  get provinces information
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
        });
    }
});
router.post('/', (req, res, next) => {
    // check identified
    if (!req.session.loggedin) {
        res.redirect('/user/login');
    }
    else {
        // create regEx for match date-> datetime
        let regEx = /(\d{4})-(\d{2})-(\d{2})T(\d+):(\d+):(\d+)/;

        let x = moment().format().match(regEx);

        let date = x.slice(1, 4).join("-");
        let time = x.slice(4).join(":");

        let dateTime = date + " " + time;

        // create data json
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
        // create random work id
        let random_txt = Math.random().toString(16).substr(3);
        let random_work_id = crypto.createHmac('sha256', secret_announce).update(random_txt).digest('hex').substr(40);

        // create sql code
        var sql = `INSERT INTO work 
                    (random_work_id,user_id, date_of_announce, goods, rateOfPrice, weight, information, status, date_of_work) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        con.query(sql,
            [
                random_work_id,
                data.userid,
                data.date_of_announce,
                data.goods,
                data.rate_of_price,
                data.weight,
                data.information,
                data.status,
                data.date_of_work],
            (err, result) => {
                if (err) throw err;
                if (result.insertId) {
                    let insertId = result.insertId;
                    var sql2 = `INSERT INTO work_location 
                                (
                                    work_id, province_start_id, 
                                    amphure_start_id, district_start_id, 
                                    province_destination_id, 
                                    amphure_destination_id, 
                                    district_destination_id
                                )
                                VALUES (?, ?, ?, ?, ?, ?, ?)`;
                    con.query(sql2,
                        [
                            insertId,
                            data.province_start,
                            data.amphure_start,
                            data.district_start,
                            data.province_destination,
                            data.amphure_destination,
                            data.district_destination
                        ],
                        (err, result2) => {
                            if (err) throw err;

                            // if success user will be redirect to work info which he/she creates
                            res.redirect('/work/info/' + insertId + "?inserted_status=success");

                        })
                } else {
                    res.redirect('/')
                }
            });
    }
});

module.exports = router;