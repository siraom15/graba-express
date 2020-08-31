var express = require('express');
var router = express.Router();

/* GET user listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/login',(req, res, next)=>{
  res.send('hello')
})

module.exports = router;
