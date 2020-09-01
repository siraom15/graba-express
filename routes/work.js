var express = require('express');
var router = express.Router();
var config = require('../database/config').mysql_pool;
var moment = require('moment');
moment.locale("th");

router.get('/', (req, res, next) => {
    let province_data = require('../data/province.json');
    config.getConnection((err, connection)=>{
        connection.query('SELECT * FROM work', (err, rows)=>{
            if(err) throw err;
            res.render('work/work', { title: 'Works |งานทั้งหมด', province_data: province_data, card_data : rows });
        })
        connection.end();
    })
    
});
router.get('/info/:id', (req, res, next) => {

    config.getConnection((err, connection)=>{
        connection.query('SELECT * FROM work WHERE id = ?', req.params.id, (err, rows)=>{
            if(err) throw err;
            let dateOfWork = moment().format('llll')
            res.render('work/info', { title: "ดูเพิ่มเติม : " + rows[0].infomation , card_data : rows, dateOfWork :  dateOfWork });
        })
        connection.end();
    });

});
module.exports = router;