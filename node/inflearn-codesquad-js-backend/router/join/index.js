var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

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
router.get('/', function(req, res) {
  console.log('get join url')
	res.render('join.ejs')
});

passport.use('local-join', new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, done) {
		console.log('local-join callback called');
	}
))

router.post('/', passport.authenticate('local-join', {
	successRedirect: '/main',
	failureRedirect: '/join',
	failureFlash: true
}))

// router.post('/', function(req, res) {
// 	var body = req.body;
// 	var email = body.email;
// 	var name = body.name;
// 	var passwd = body.password;
// 	var sql = {email: email, name: name, pw: passwd}
// 	var query = connection.query(`INSERT INTO user set ?`, sql, function(err, rows) {
// 		if(err) throw err;
// 		else res.render('welcome.ejs', {'name': name, 'id': rows.insertId})
// 	})
// })

module.exports = router;
