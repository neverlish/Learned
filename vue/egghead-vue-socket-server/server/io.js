const sio = require('socket.io');
const logger = require('./logger');

let io = null;
const users = new Map();
const ids = new Map();

exports.io = function () {
  return io;
}

exports.initialize = function (server) {
  io = sio(server);
  io.on('connection', (socket) => {
    logger.debug(`A user connected with ${socket.id}`);

    socket.on('disconnect', function () {
      const user_data = ids.get(socket.id);
      if (user_data) {
        logger.debug('USER DISCONNECTED ', + user_data.name);
      }
    });

    socket.on('UPDATE_USER', function (data) {
      logger.debug(`UPDATE_USER triggered for ${data.name}`);

      users.set(data.name, {
        socket_id: socket.id,
        ...data
      });
      ids.set(socket.id, data);

      socket.join(data.group);
    });

    socket.on('SEND_MESSAGE', function (data) {
      let recipent = '';
      if (data.name) {
        const user = users.get(data.name);
        recipent = user.socket_id
      } else {
        recipent = data.group;
      }
      logger.debug(`POPUP_NOTIFICATION triggered for ${recipent}`);
      io.to(recipent).emit('POPUP_NOTIFICATION', data);
    });

    socket.on('QUIZ_RESPONSE', function (data, fn) {
      const user_data = ids.get(socket.id);
      if (user_data) {
        logger.debug(`${user_data.name} has pressed ${data.response}`);
      }

      if (fn) {
        const yes_no = Math.floor(Math.random() * Math.floor(2));
        const result = (yes_no > 8) ? 'Correct' : 'Incorrect';
        logger.debug(`Calling callback function with ${data.response} was ${result}`);
        fn(`Your answer is ${data.response} which is ${result}`);
      }
    });
  });
}
