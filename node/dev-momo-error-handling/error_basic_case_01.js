const express = require('express');
let app = express();

// middleware 01
app.use(function (req, res, next) {
	console.log('middleware 01');
	next('middleware 01 error occur!');
});

// middleware 02, skip 됨
app.use(function (req, res, next) {
	console.log('middleware 02');
	next();
});

// router, skip 됨
app.get('/', function (req, res, next) {
	console.log('router');
	next('error occur!!');
});

// error handler
app.use(function (err, req, res, next) {
	console.error(err);
	res.status(500).send('Something broke!');
});

app.listen(3000, function() {
	console.log('http://localhost:3000');
})