var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('home/welcome');
});

router.get('/about', function(req, res) {
  res.render('home/about');
});

module.exports = router;
