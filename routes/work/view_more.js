var express = require('express');
var router = express.Router();
var con = require('../../database/connect');
router.get('/:page', (req, res, next) => {
    let page = req.params.page;
    if (!isNaN(page)) {

        // we separate page by 3 item

        //  data/item example 100 rows/ 3 item = 34 page
        // if we get page 1 it's mean sql select limit 0,3 (item)
        // page 1 limit 0,3 (item)
        // page 2 limit 3,3 (item)
        // page 3 limit 6,3(item)
        // so page n limit  3(n-1), 3(item)

        let start = 3 * (page - 1);
        let item_perpage = 3;
        console.log(page);
        let sql =
            `SELECT
            w.id, 
            w.random_work_id,
            w.date_of_announce,
            w.goods,
            w.rateOfPrice,
            w.weight,
            w.information,
            w.status,
            w.date_of_work,
            p1.name_th AS province_start_name ,
            a1.name_th AS amphure_start_name,
            d1.name_th AS district_start_name,
            p2.name_th AS province_destination_name ,
            a2.name_th AS amphure_destination_name,
            d2.name_th AS district_destination_name,
            
            u.firstname,u.lastname, u.picture_path 
            FROM work w 
            JOIN user u on w.user_id = u.id 

            JOIN work_location wl on wl.work_id = w.id
            JOIN provinces p1 on wl.province_start_id = p1.id
            JOIN amphures a1 on wl.amphure_start_id = a1.id
            JOIN districts d1 on wl.district_start_id = d1.id
            JOIN provinces p2 on wl.province_destination_id = p2.id
            JOIN amphures a2 on wl.amphure_destination_id = a2.id
            JOIN districts d2 on wl.district_destination_id = d2.id

            ORDER BY w.status ASC, w.date_of_announce DESC
            
            LIMIT ?, ?
            `;
        con.query(sql, [start, item_perpage], (err, rows) => {
            res.render('work/view-more',{card_data:rows});
            res.end();
        })
    } else {
        res.redirect('/');
    }
});

module.exports = router;