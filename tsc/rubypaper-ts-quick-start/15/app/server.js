// 15-3-1 Node.js 기반의 서버 개발 - Node.js 서버 만들기 - 서버 코드(서버 실행 시 사용)

'use strict';
var server = require('./dist/server/server');
var debug = require('debug')('express:server');
var http = require('http');

// 서버 생성
var httpPort = 8080;
var app = server.Server.bootstrap().app;
app.set('port', httpPort);
var httpServer = http.createServer(app);
httpServer.listen(httpPort);

// 에러 핸들러 추가
httpServer.on('error', onError);

// 서버가 바인딩될 때 호출
httpServer.on('listening', onListening);

// 에러 핸들러
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof httpPort === 'string'
    ? 'Pipe ' + httpPort
    : 'Port ' + httpPort;

  // 에러가 발생하면 에러 코드에 따라 에러 메시지 출력
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// 서버가 바인딩될 때 호출
function onListening() {
  var addr = httpServer.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;

  console.info('Listening on ' + bind);
}
