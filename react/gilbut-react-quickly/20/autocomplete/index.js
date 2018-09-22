const express = require('express'),
      mongodb = require('mongodb'),
      app = express(),
      bodyParser = require('body-parser'),
      validator = require('express-validator'),
      logger = require('morgan'),
      errorHandler = require('errorhandler'),
      compression = require('compression'),
      exphbs  = require('express-handlebars'),
      url = 'mongodb://localhost:27017/autocomplete',
      ReactDOM = require('react-dom'),
      ReactDOMServer = require('react-dom/server'),
      React = require('react')

require('babel-register')({
  presets: ['react']
})

const Autocomplete  = React.createFactory(require('./src/autocomplete.jsx')),
      port = 3000
