var io = require('socket.io');
var config = require('../config');

var socketConnection = function socketConnection(socket) {
  socket.emit('message', {message: 'Hey!'});
};

exports.startIo = function startIo (server) {
  io = io.listen(server);
  var packtchat = io.of('/packtchat');
  packtchat.on('connection', socketConnection);
}
