var http = require('http');

var opts = {
  host: 'www.google.com',
  port: 80,
  method: 'POST',
  path: '/',
  headers: {}
};

var req = http.get(opts, function(res) {
  // 응답 처리
  var resData = '';
  res.on('data', function(chunk) {
    resData += chunk;
  });

  res.on('end', function() {
    console.log(resData);
  });
});

opts.headers['Content-Type'] = 'application/x-www-form/urlencoded';
req.data = 'q=actor';
opts.headers['Content-Length'] = req.data.length;

req.on('error', function(err) {
  console.log('오류 발생 : ' + err.message);
});

// 요청 전송
req.write(req.data);
req.end();
