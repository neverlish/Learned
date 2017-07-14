var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var path = require('path');

var port = 8080;
var db = 'mongodb://localhost:27017/search-app/'

var users = require('./routes/user');
var website = require('./routes/website');

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'super duper secret',
  saveUninitialized: true,
  resave: true
}));

require('./config/passport')();

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', users);
app.use('/website', website);

app.listen(port, function() {
  console.log('app listening on port ' + port);
})
