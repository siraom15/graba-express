var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'thailand'
});


router.get('/', (req, res, next) => {
    var sql = 'select * from provinces';
    con.query(sql, (err, rows) => {
        res.render('test', { data: rows })
    })
    // con.end();
})
router.get('/get_amphure/:province_id',(req,res,next)=>{
    console.log(req.params.province_id);
    var sql = 'select * from amphures where province_id = ?';
    con.query(sql,req.params.province_id,(err, rows) => {
        // console.log(rows); 
        res.send(rows);
    });
    // con.end();
});

router.get('/get_district/:amphure_id',(req,res,next)=>{
    console.log(req.params.amphure_id);
    var sql = 'select * from districts where amphure_id = ?';
    con.query(sql,req.params.amphure_id,(err, rows) => {
        // console.log(rows); 
        res.send(rows);
    });
    // con.end();
});
module.exports = router;