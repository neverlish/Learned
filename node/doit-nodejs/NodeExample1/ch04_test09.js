var fs = require('fs');

// 파일에서 데이터를 읽어 들입니다.
fs.open('./output.txt', 'r', function(err, fd) {
  if(err) throw err;

  var buf = new Buffer(10);
  console.log('버퍼 타입 : %s', Buffer.isBuffer(buf));

  fs.read(fd, buf, 0, buf.length, null, function(err, bytesRead, buffer) {
    if(err) throw err;

    var inStr = buffer.toString('utf8', 0, bytesRead);
    console.log(err, bytesRead, buffer);

    fs.close(fd, function() {
      console.log('output.txt 파일을 열고 읽기 완료.');
    });
  });
});
