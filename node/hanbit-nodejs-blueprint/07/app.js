// 노드 디펜던시
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// 애플리케이션 라우트 설정
var routes = require('./routes/index');
// 익스프레스 애플리케이션 생성
var app = express();
// 개발용 env 변수 프로세스 정의하기
var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';
// 뷰 엔진이 EJS(Embedded Javascript)를 사용하도록 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 애플리케이션에서 파비콘을 사용하려면 아래 주석을 풀 것
// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 라우트 파일에서 수신할 모든 라우트 설정하기(routes 변수에서 왔음)
app.use('/', routes);
// 404 에러 핸들러 설정
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
// 에러 스택트레이스 출력
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err,
			title: 'error'
		});
	});
}
// 실무에서는 스택트레이스를 사용하지 않음
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {},
		title: 'error'
	});
});
module.exports = app;
// 모든 애플리케이션 설정 내보내기
app.set('port', process.env.PORT || 3000);
// 서버 포트 설정 및 사용자 메시지 출력
var server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + server.address().port);
})
