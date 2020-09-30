var express = require('express');
var router = express.Router();
var con = require('../../database/connect');

router.get('/:random_work_id', (req, res, next) => {
    if (!req.session.loggedin) {
        res.redirect('/user/login')
    } else {
        let random_work_id = req.params.random_work_id;
        let sql = `
        SELECT w.*,
        p1.name_th AS province_start_name ,
        a1.name_th AS amphure_start_name,
        d1.name_th AS district_start_name,
        
        p2.name_th AS province_destination_name ,
        a2.name_th AS amphure_destination_name,
        d2.name_th AS district_destination_name,
        wl.*,
        u.firstname,
        u.lastname,
        u.picture_path,
        u.random_user_id 
        FROM work w 

        JOIN work_location wl on wl.work_id = w.id
        JOIN provinces p1 on wl.province_start_id = p1.id
        JOIN amphures a1 on wl.amphure_start_id = a1.id
        JOIN districts d1 on wl.district_start_id = d1.id
        JOIN provinces p2 on wl.province_destination_id = p2.id
        JOIN amphures a2 on wl.amphure_destination_id = a2.id
        JOIN districts d2 on wl.district_destination_id = d2.id
        JOIN user u on w.user_id = u.id 

        WHERE u.id = ? AND w.random_work_id = ?
 
        ORDER BY w.status ASC, w.date_of_announce DESC`;
        con.query(sql, [req.session.userid, random_work_id], (err, rows) => {
            if (err) console.log(err);
            if (rows.length > 0) {
                let title = "แก้ไขงาน"
                res.render('user/edit-announce', { title: title, work_data: rows });
                // res.end();
            } else {
                res.redirect('/');
                // res.end();
            }

        })
    }

});
router.post('/:id', (req, res, next) => {

})
module.exports = router;