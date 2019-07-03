const sio = require('socket.io');
const logger = require('./logger');

let io = null;

exports.initialize = function (server) {
  io = sio(server);
}

exports.io = function () {
  return io;
}