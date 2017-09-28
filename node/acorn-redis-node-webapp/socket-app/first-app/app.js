var io = require('socket.io').listen(4000);

io.sockets.on('connection', function(socket) {
  socket.emit('ping');

  socket.on('pong', function(data) {
    console.log('pong');
  });
});
