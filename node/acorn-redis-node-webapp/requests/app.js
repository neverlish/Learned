var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.set('Important-Header', 'text-value');
  res.send('hello world');
});

app.post('/', function(req, res) {
  res.send('<h1>POSTED</h1>');
});

app.listen(3000);
