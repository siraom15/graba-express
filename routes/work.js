var express = require('express');

var router = express.Router();
router.get('/', (req, res, next) => {
    let province_data = require("../data/province.json");
    res.render('work/work', { title: 'Works |งานทั้งหมด',province_data: province_data });
});
router.get('/info/:id', (req, res, next) => {
    let title = "";
    let data = "nothing";
    res.render('work/info', { title: title, data: data});
});
module.exports = router;