const dotenv = require('dotenv').config({
  path: 'variables.env'
});

const express = require('express');
const app = express();
const pjson = require('./package.json');
const path = require('path');
const port = process.env.PORT || 8500;
const server = require('http').Server(app);
const logger = require('./logger');

const io = require('./io').initialize(server);
const global_socket = require('./io').io();

app.use(express.static(path.join(__dirname, 'public')));

server.listen(port);

logger.info(`${pjson.name} Server Started >> `);
logger.info(`running in ${process.env.NODE_ENV}`);
logger.info(`running on port ${port}`);

setInterval(function () {
  global_socket.emit('PULSE', heartbeat())
}, 1000);

function heartbeat() {
  const pulse = Math.ceil(Math.random() * (160 - 60) + 60);
  logger.debug(`Heartbeat ${pulse}`);
  return pulse;
}