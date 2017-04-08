const express = require('express');
const app = express();
const morgan = require('morgan');
var bodyParser = require('body-parser');
var user = require('./api/user')

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', user)

module.exports = app;
