var io = require('socket.io');
var config = require('../config');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var ConnectRedis = require('connect-redis')(expressSession);
var redisSession = new ConnectRedis({
  host: config.redisHost,
  port: config.redisPort
})

var socketAuth = function socketAuth (socket, next) {
  var handshakeData = socket.request;
  var parsedCookie = cookie.parse(handshakeData.headers.cookie);
  var sid = cookieParser.signedCookie(parsedCookie['connect.sid'], config.secret);
  
  if (parsedCookie['connect.sid'] === sid)
    return next(new Error('Nothing Defined'));
  
  redisSession.get(sid, function(err, session) {
    if (session.isAuthenticated) {
      socket.user = session.user;
      socket.sid = sid;
      return next(); 
    } else {
      return next(new Error('Not Authenticated'));
    }
  })
}

var socketConnection = function socketConnection(socket) {
  socket.emit('message', {message: 'Hey!'});
  socket.emit('message', socket.user);
};

exports.startIo = function startIo (server) {
  io = io.listen(server);
  var packtchat = io.of('/packtchat');

  packtchat.use(socketAuth);
  packtchat.on('connection', socketConnection);
}
