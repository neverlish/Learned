var express = require('express');
var app = express();
var user = require('./routes/user');

app.get('/', function(req, res) {
  res.send('Hello World');
});

app.use('/user', user);

app.listen(3000, function() {
  console.log('Example App is listening on port 3000');
});
