var log = require('./log');

exports.notFound = function notFound(req, res, next) {
  res.send(404, 'You seem lost. You must have taken a wrong turn back there.');
}

exports.error = function error(err, req, res, next) {
  log.error({error: err.message, ts: Date.now()});
  res.send(500, 'Something broke. What did you do?');
}
