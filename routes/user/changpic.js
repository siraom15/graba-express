var express = require('express');
var router = express.Router();
var multer = require('multer')
var path = require('path');
var fs = require('fs')
var gm = require('gm');
var con = require('../../database/connect')
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images/upload/');
    },
    filename: function (req, file, callback) {
        let filename = req.session.random_user_id;
        var ext = path.extname(file.originalname);
        callback(null, filename + ext);
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        console.log(file);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits: {
        fileSize: 1024 * 1024
    }
}).single('avatar')
router.get('/', (req, res, next) => {
    if (!req.session.loggedin) {
        res.redirect('/');
    }
    else {
        let user_data_sql = `SELECT * FROM user WHERE id = ?`;
        con.query(user_data_sql, req.session.userid, (err, rows) => {
            if (err) console.log(err);
            else {
                let title = "เปลี่ยนรูปโปรไฟล์"
                res.render('user/changepic', { title: title, user_data: rows });
            }
        })

    }
})
router.post('/', (req, res, next) => {
    if (!req.session.loggedin) {
        res.redirect('/');
    }
    else {
        let user_data_sql = `SELECT * FROM user WHERE id = ?`;
        con.query(user_data_sql, req.session.userid, (err, rows) => {
            if (err) console.log(err);
            else {
                upload(req, res, (err) => {
                    if (err) {
                        let title = "เปลี่ยนรูปโปรไฟล์"
                        res.render('user/changepic', { title: title, user_data: rows, err: "นามสกุลไฟล์ไม่ถูกต้อง กรุณาอัปโหลดรูปภาพใหม่" });
                        res.end();
                    }
                    else {
                        let filename = req.session.random_user_id + path.extname(req.file.originalname);
                        let userid = req.session.userid;
                        let sql = 'UPDATE user SET picture_path = ? WHERE user.id = ?';
                        con.query(sql, [filename, userid], (err, rows2) => {
                            if (err) throw err;
                            // console.log(rows2);
                            let title = "เปลี่ยนรูปโปรไฟล์"
                            res.render('user/changepic', { title: title, user_data: rows, success: true })
                            res.end();
                        });

                    }
                })
            }
        })

    }

})

module.exports = router;
