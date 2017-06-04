var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./book.model');
var port = 8080;
var db = 'mongodb://localhost:27017/example';

mongoose.connect(db);

app.get('/', function(req, res) {
  res.send('Happy to be here');
});

app.get('/book', function(req, res) {
  console.log('getting al books');
  Book.find({})
    .exec(function(err, books) {
      if (err) {
        res.send('error has occured');
      } else {
        console.log(books);
        res.json(books);
      }
    })
});

app.listen(port, function() {
  console.log('app listening on port ' + port);
})
