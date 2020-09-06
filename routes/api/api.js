var express = require('express');
var router = express.Router();
var con = require('../../database/connect');

router.get('/get_amphure/:province_id', (req, res, next) => {
    var sql = 'select * from amphures where province_id = ?';
    con.query(sql, req.params.province_id, (err, rows) => {
        res.send(rows);
        res.end();
    });

});

router.get('/get_district/:amphure_id', (req, res, next) => {
    var sql = 'select * from districts where amphure_id = ?';
    con.query(sql, req.params.amphure_id, (err, rows) => {
        res.send(rows);
        res.end();
    });
});


router.get('/province/:id', (req, res, next) => {
    var sql = 'select * from provinces where id = ?';
    con.query(sql, req.params.id, (err, rows) => {
        res.send(rows);
        res.end();
    });
});


router.get('/amphure/:id', (req, res, next) => {
    var sql = 'select * from amphure where id = ?';
    con.query(sql, req.params.id, (err, rows) => {
        res.send(rows);
        res.end();
    });
});



router.get('/district/:id', (req, res, next) => {
    var sql = 'select * from district where id = ?';
    con.query(sql, req.params.id, (err, rows) => {
        res.send(rows);
        res.end();
    });
});



module.exports = router;