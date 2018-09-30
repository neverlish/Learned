// HTTP 클라이언트 전체 코드

var http = require('http');

var options = {
  host: '127.0.0.1',
  port: 8000,
  path: '/'
};

var req = http.request(options, (res) => {
  var data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(data);
  });
});

req.end();
