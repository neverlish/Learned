var express = require('express')
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/process/login/:name', function(req, res, next) {
  console.log('/process/login 요청을 처리함.');

  var paramName = req.params.name;
  var paramId = req.param('id');
  var paramPassword = req.param('password');

  res.writeHead(200, {'Content-Type': 'text/html;charset=utf8'});
  res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
  res.write('<div><p>Param name : ' + paramName + '</p></div>');
  res.write('<div><p>Param id : ' + paramId + '</p></div>');
  res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
  res.write('<br><br><a href="/public/login2.html">로그인 페이지로 돌아가기</a>');
  res.end();
});

http.createServer(app).listen(3000, function() {
  console.log('Express 서버가 3000번 포트에서 시작됨.');
});
