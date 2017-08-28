/*
소켓 서버와 소켓 클라이언트 기능을 노드로 구성하여 소켓 클라이언트에서 데이터를 보내면 소켓 서버에서 다시 돌려주는 기능을 만들어 보세요.
1. 노드의 소켓 기능을 이용해 소켓 서버와 소켓 클라이언트를 만듭니다.
2. 소켓 클라이언트에서는 소켓 서버로 연결합니다.
3. 소켓 클라이언트에서 소켓 서버로 '안녕!' 같은 글자를 보내면 소켓 서버에서 그 글자를 그대로 다시 소켓 클라이언트로 보냅니다.
4. 소켓 클라이언트와 소켓 서버에서는 보내고 받은 데이터를 화면에 출력합니다.
*/

var net = require('net');
var server = net.createServer(function(socket) {
  socket.name = socket.remoteAddress + ':' + socket.remotePort;

  socket.on('data', function(data) {
    console.log(data.toString('utf8'));
    socket.write(data.toString('utf8'));
  });

  socket.on('end', function() {
    console.log('disconnected from ', socket.name);
  });
});

server.listen(3000);
console.log('socket server running');
