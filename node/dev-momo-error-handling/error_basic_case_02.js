const express = require('express');
let app = express();

app.use(function(req, res, next) {
	next('request error');
});

app.use(logErrorHandler);
app.use(requestErrorHandler);

// 어떤 에러가 발생했는지 기록
function logErrorHandler(err, req, res, next) {
	console.log('logErrorHandler', 'record:', err);
	next(err);
}

// client 에게 error 일 때 응답을 내려줌
function requestErrorHandler(err, req, res, next) {
	console.error('requestErrorHandler', err);
	res.status(500).send('send error response');
}

app.listen(3000, function() {
	console.log('http://localhost:3000');
})