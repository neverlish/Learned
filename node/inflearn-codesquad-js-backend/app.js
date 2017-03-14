var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.listen(3000, function() {
	console.log('Start! express server on port 3000');
});

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/public/main.html")
});

app.get('/main', function(req, res) {
	res.sendFile(__dirname + '/public/main.html')
})

app.post('/email_post', function(req, res) {
	console.log(req.body.email)
	res.render('email.ejs', {'email': req.body.email})
});