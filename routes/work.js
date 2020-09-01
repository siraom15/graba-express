var express = require('express');
var router = express.Router();
var config = require('../database/config').mysql_pool;
var moment = require('moment');
moment.locale("th");
router.get('/', (req, res, next) => {
    let province_data = require('../data/province.json');
    config.getConnection((err, connection)=>{
        let sql = `SELECT w.*, u.firstname,u.lastname, u.picture_path FROM work w JOIN user u on w.user_id = u.id ORDER BY w.status ASC, w.date_of_announce DESC`;
        connection.query(sql, (err, rows)=>{
            if(err) throw err;
            res.render('work/work', { title: 'Works |งานทั้งหมด', province_data: province_data, card_data : rows });
        })
        connection.release();
    })
    
});
router.get('/info/:id', (req, res, next) => {
    config.getConnection((err, connection)=>{
        let sql = `SELECT * FROM work w JOIN user u on w.user_id = u.id WHERE w.id = ?`;
        connection.query(sql, req.params.id, (err, rows)=>{
            if(err) throw err;
            let dateOfWork = moment(rows[0].date_of_work).format('llll');
            let dateOfAnnounce = moment(rows[0].date_of_announce).format('llll');
            res.render('work/info', { title: "ดูเพิ่มเติม : " + rows[0].infomation , card_data : rows, dateOfWork :  dateOfWork, dateOfAnnounce : dateOfAnnounce });
        })
        connection.release();
    });

});
module.exports = router;