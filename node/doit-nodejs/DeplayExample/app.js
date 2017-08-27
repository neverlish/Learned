
/**
 * router 미들웨어 추가하기
 */

var express = require('express')
, http = require('http')
, path = require('path');

var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/process/login', function(req, res) {
  console.log('/process/login 처리함.');

  var paramId = req.param('id');
  var paramPassword = req.param('password');

  res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
  res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
  res.write('<div><p>Param id : ' + paramId + '</p></div>');
  res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
  res.write("<br><br><a href='/public/login2.html'>로그인 페이지로 돌아가기</a>");
  res.end();
});

app.all('*', function(req, res) {
  res.send(404, '<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>')
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
