const express = require('express');
let app = express();

// error handler. 순서상 앞에 있어서 호출되지 않음
app.use(function(err, req, res, next) {
	console.error(err);
	res.status(500).send('Something broke!');
});

// router
app.get('/', function(req, res, next) {
	next('error occur!');
});

app.listen(3000, function() {
	console.log('http://localhost:3000');
});