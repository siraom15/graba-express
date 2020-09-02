var express = require('express');
var router = express.Router();
var con = require('../../database/connect');
var moment = require('moment');
moment.locale("th");

router.get('/:id', (req, res, next) => {
    let sql = `SELECT * FROM work w JOIN user u on w.user_id = u.id WHERE w.id = ?`;
    con.query(sql, req.params.id, (err, rows) => {
        if (err) throw err;
        let dateOfWork = moment(rows[0].date_of_work).format('llll');
        let dateOfAnnounce = moment(rows[0].date_of_announce).format('llll');
        res.render('work/info', { title: "ดูเพิ่มเติม : " + rows[0].information, card_data: rows, dateOfWork: dateOfWork, dateOfAnnounce: dateOfAnnounce });
    });

});

module.exports = router;