// 08-4-3 특정 모듈 형식을 실행하기 위한 준비 - 모듈 로더를 구동하기 위해 HTTP 서버 준비 - Node.js 기반 HTTP 서버

var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, '')));
var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log(port + ' port server');
}) 
