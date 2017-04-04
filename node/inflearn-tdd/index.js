const express = require('express'); 
const app = express();

function commonmw(req, res, next) {
  console.log('commonmw');
  next(new Error('error occured'));
}

function errormw(err, req, res, next) {
  console.log(err.message);
  next();
}

app.use(commonmw);
app.use(errormw);

app.listen(3000, function() {
  console.log('Server is running');
});
