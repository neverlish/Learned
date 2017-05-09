const express = require('express');
let app = express();
let router = express.Router();

router.get('/user/:id', function(req, res, next) {
	if (req.params.id == 0) next('route');
	else next();
}, function (req, res, next) {
	res.send('normal');
});

router.get('/user/:id', function(req, res, next) {
	console.log(req.params.id);
	res.send('special');
});

app.use('/', router);

app.listen(3000, function() {
	console.log('http://localhost:3000');
})