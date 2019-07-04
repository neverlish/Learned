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
const bodyParser = require('body-parser');

const io = require('./io').initialize(server);
const global_socket = require('./io').io();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.post('/notification', function (req, res) {
  logger.debug(`Message Receiverd: ${req.body.message}`);
  global_socket.emit('POPUP_NOTIFICATION', {
    message: req.body.message,
    color: req.body.color
  });
  res.send();
});

server.listen(port);

logger.info(`${pjson.name} Server Started >> `);
logger.info(`running in ${process.env.NODE_ENV}`);
logger.info(`running on port ${port}`);
