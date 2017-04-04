var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')

// DATABASE SETTING
var mysql = require('mysql')
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	database: 'jsman'
})
connection.connect()

// ROUTER!!
router.post('/form', function(req, res) {
	console.log(req.body.email)
	res.render('email.ejs', {'email': req.body.email})
});

router.post('/ajax', function(req, res) {
	var email = req.body.email;
	var responseData = {};
	var query = connection.query('select name from user where email="' + email + '"', function(err, rows) {
		if(err) throw err;
		if(rows[0]) {
			responseData.result = 'ok';
			responseData.name = rows[0].name;
		} else {
			responseData.result = 'none';
			responseData.name = '';
		}
		res.json(responseData);
	})
})

module.exports = router;
