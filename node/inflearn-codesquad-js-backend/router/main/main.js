var express = require('express')
var router = express.Router();
var path = require('path')

router.get('/', function(req, res) {
	console.log('main is loaded')
	res.sendFile(path.join(__dirname, '../../public/main.html'))
})

module.exports = router;
