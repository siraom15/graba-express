var express = require('express');
var router = express.Router();
var con = require('../../database/connect');
//  we edit on /user/info

// get user info

router.get('/:user_random_id', (req, res, next) => {
    if (!req.params.user_random_id) return;
    let user_random_id = req.params.user_random_id;
    let sql = `SELECT * FROM user WHERE random_user_id = ?`;
    con.query(sql, user_random_id, (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
            let title = "ข้อมูลผู้ใช้ : " + rows[0].firstname;
            let user_id = rows[0].id;
            // let sql_2 = `SELECT * FROM work WHERE user_id = ? `;
            let sql_2 = `
                SELECT w.*,
                p1.name_th AS province_start_name ,
                a1.name_th AS amphure_start_name,
                d1.name_th AS district_start_name,
                
                p2.name_th AS province_destination_name ,
                a2.name_th AS amphure_destination_name,
                d2.name_th AS district_destination_name,
                wl.*,u.firstname,u.lastname, u.picture_path 
                FROM work w 

                JOIN work_location wl on wl.work_id = w.id
                JOIN provinces p1 on wl.province_start_id = p1.id
                JOIN amphures a1 on wl.amphure_start_id = a1.id
                JOIN districts d1 on wl.district_start_id = d1.id
                JOIN provinces p2 on wl.province_destination_id = p2.id
                JOIN amphures a2 on wl.amphure_destination_id = a2.id
                JOIN districts d2 on wl.district_destination_id = d2.id
                JOIN user u on w.user_id = u.id 

                WHERE u.id = ?
        
                ORDER BY w.status ASC, w.date_of_announce DESC`;
            con.query(sql_2, user_id, (err, rows2) => {
                if (err) throw err;
                if (rows2.length > 0) {
                    // เคยประกาศงาน
                    res.render('user/info', { title: title, user_data: rows, card_data: rows2 });
                    res.end();

                } else {

                    // ไม่เคยประกาศงาน
                    res.render('user/info', { title: title, user_data: rows, card_data: null })
                    res.end();

                }
            });

        } else {
            res.send("no user");
            res.end();
        }
    });
});



module.exports = router;