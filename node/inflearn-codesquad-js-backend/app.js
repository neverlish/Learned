var express = require('express')
var app = express()

app.listen(3000, function() {
	console.log('Start! express server on port 3000');
});

app.use(express.static('public'))

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/public/main.html")
});

app.get('/main', function(req, res) {
	res.sendFile(__dirname + '/public/main.html')
})