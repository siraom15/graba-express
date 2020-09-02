var express = require('express');
var router = express.Router();
var con = require('../../database/connect');
var moment = require('moment');
moment.locale("th");

router.get('/', (req, res, next) => {
    // let sql = `SELECT w.*, u.firstname,u.lastname, u.picture_path FROM work w JOIN user u on w.user_id = u.id ORDER BY w.status ASC, w.date_of_announce DESC`;
    let sql =  
    `SELECT w.*, wl.*,u.firstname,u.lastname, u.picture_path FROM work w 
    JOIN work_location wl on wl.id = w.id
    JOIN user u on w.user_id = u.id 
    ORDER BY w.status ASC, w.date_of_announce DESC`;

    con.query(sql, (err, rows) => {
        if (err) throw err;
        console.log(rows);
        res.render('work/index', { title: 'Works |งานทั้งหมด', card_data: rows });
    })
});


module.exports = router;