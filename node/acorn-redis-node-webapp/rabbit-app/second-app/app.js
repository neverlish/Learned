var express = require('express'),
    amqp = require('amqp'),
    io = require('socket.io');

var app = express();

app.use(express.static(__dirname));

var rabbit = amqp.createConnection();

rabbit.on('ready', function() {
  rabbit.exchange('credit_charge', {autoDelete: false}, function(ex) {
    rabbit.queue('charge', {autoDelete: false}, function(q) {
      q.bind('credit_charge', q.name);
      q.close();
      startServer(ex);
    });
  });
});
