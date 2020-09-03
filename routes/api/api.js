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
})
router.get('/get_amphure/:province_id',(req,res,next)=>{
    var sql = 'select * from amphures where province_id = ?';
    con.query(sql,req.params.province_id,(err, rows) => {
        res.send(rows);
    });
  
});

router.get('/get_district/:amphure_id',(req,res,next)=>{
    var sql = 'select * from districts where amphure_id = ?';
    con.query(sql,req.params.amphure_id,(err, rows) => {
        res.send(rows);
    });
});

router.get('/province/:id',(req, res, next)=>{
    var sql = 'select * from provinces where id = ?';
    con.query(sql,req.params.id,(err, rows) => {
        res.send(rows);
    });
});
router.get('/amphure/:id',(req, res, next)=>{
    var sql = 'select * from amphure where id = ?';
    con.query(sql,req.params.id,(err, rows) => {
        res.send(rows);
    });
});

router.get('/district/:id',(req, res, next)=>{
    var sql = 'select * from district where id = ?';
    con.query(sql,req.params.id,(err, rows) => {
        res.send(rows);
    });
});

module.exports = router;