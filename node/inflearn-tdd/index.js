const express = require('express'); 
const app = express();
const morgan = require('morgan');
var users = [
  {id: 1, name: 'alice'},
  {id: 2, name: 'bek'},
  {id: 3, name: 'cris'}
];

app.use(morgan('dev'));

app.get('/users', function (req, res) {
  res.json(users);
});

app.listen(3000, function() {
  console.log('Server is running ion port 3000!');
});

module.exports = app;
