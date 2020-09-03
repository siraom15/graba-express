var express = require('express');
var router = express.Router();
var con = require('../../database/connect');
var moment = require('moment');
moment.locale("th");

router.get('/:id', (req, res, next) => {
    let sql = `
    SELECT w.*,
    p1.name_th AS province_start_name ,
    a1.name_th AS amphure_start_name,
    d1.name_th AS district_start_name,
    
    p2.name_th AS province_destination_name ,
    a2.name_th AS amphure_destination_name,
    d2.name_th AS district_destination_name,
    wl.*,
    u.firstname, u.lastname, u.picture_path 
    FROM work w 

    JOIN work_location wl on wl.id = w.id
    JOIN provinces p1 on wl.province_start_id = p1.id
    JOIN amphures a1 on wl.amphure_start_id = a1.id
    JOIN districts d1 on wl.district_start_id = d1.id
    JOIN provinces p2 on wl.province_destination_id = p2.id
    JOIN amphures a2 on wl.amphure_destination_id = a2.id
    JOIN districts d2 on wl.district_destination_id = d2.id
    JOIN user u on w.user_id = u.id  
    WHERE w.id = ?`;
    con.query(sql, [req.params.id], (err, rows) => {
        if (err) throw err;
        console.log(rows);
        if (rows.length > 0) {
            let dateOfWork = moment(rows[0].date_of_work).format('llll');
            let dateOfAnnounce = moment(rows[0].date_of_announce).format('llll');
            res.render('work/info', { title: "ดูเพิ่มเติม : " + rows[0].information, card_data: rows, dateOfWork: dateOfWork, dateOfAnnounce: dateOfAnnounce });
        } else {
            res.redirect('/')
        }
    });

});

module.exports = router;