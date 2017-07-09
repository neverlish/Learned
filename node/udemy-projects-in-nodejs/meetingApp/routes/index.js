var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/newnote', function(req, res) {
  res.render('newnote');
});

module.exports = router;
