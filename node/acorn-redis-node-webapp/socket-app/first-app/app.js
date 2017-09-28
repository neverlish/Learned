var io = require('socket.io').listen(4000);

io.sockets.on('connection', function(socket) {
  socket.on('join', function(data) {
    io.sockets.emit('userJoined', data);
    socket.username = data.username;
  });
  socket.on('ping', function(data) {
    io.sockets.emit('ping', {username: socket.username});
  });
});
