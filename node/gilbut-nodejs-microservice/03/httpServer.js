// HTTP 서버 전체 코드

var http = require('http');

var server = http.createServer((req, res) => {
  res.end('hello world');
});

server.listen(8000);
