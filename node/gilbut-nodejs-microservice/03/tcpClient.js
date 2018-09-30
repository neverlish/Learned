// TCP 클라이언트 전체 코드

var net = require('net');

var options = {
  port: 9000,
  host: '127.0.0.1'
};

var client = net.connect(options, () => {
  console.log('connected');
});

client.on('data', (data) => {
  console.log(data.toString());
});

client.on('end', () => {
  console.log('disconnected');
});
