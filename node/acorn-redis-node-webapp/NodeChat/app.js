var express = require('express');
var app = express();
var routes = require('./routes');

app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/login', routes.loginProcess);
app.get('/chat', routes.chat);

app.listen(3000);
console.log('App server running on port 3000');
