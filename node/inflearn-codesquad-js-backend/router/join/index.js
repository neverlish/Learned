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
router.get('/', function(req, res) {
  console.log('get join url')
	res.sendFile(path.join(__dirname, '../../public/join.html'))
});

router.post('/', function(req, res) {

})

module.exports = router;
