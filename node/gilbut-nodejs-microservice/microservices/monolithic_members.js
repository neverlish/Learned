const mysql = require('mysql');
const conn = {
  host: 'localhost',
  user: 'micro',
  password: 'service',
  database: 'monolithic'
};

exports.onRequest = function(res, method, pathname, params, cb) {
  switch (method) {
    case 'POST':
      return register(method, pathname, params, (response) => {
        process.nextTick(cb, res, response);
      });
    case 'GET':
      return inquiry(method, pathname, params, (response) => {
        process.nextTick(cb, res, response);
      });
    case 'DELETE':
      return unregister(method, pathname, params, (response) => {
        process.nextTick(cb, res, response);
      });
    default:
      return process.nextTick(cb, res, null);
  }
}

function register(method, pathname, params, cb) {
  var response = {
    key: params.key,
    errorcode: 0,
    errormessage: 'success'
  };

  if (params.username == null || params.password == null) {
    response.errorcode = 1;
    response.errormessage = 'Invalid Parameters';
    cb(response);
  } else {
    var connection = mysql.createConnection(conn);
    connection.connect();
    connection.query(
      "insert into members(username, password) values('" + params.username + "',password('" + params.password + "'));",
      (error, results, fields) => {
        if (error) {
          response.errorcode = 1;
          response.errormessage = error;
        }
        cb(response);
      }
    );
    connection.end();
  }
}

function inquiry(method, pathname, params, cb) {
  var response = {
    key: params.key,
    errorcode: 0,
    errormessage: 'success'
  };

  if (params.username == null || params.password == null) {
    response.errorcode = 1;
    response.errormessage = 'Invalid Parameters';
    cb(response);
  } else {

    var connection = mysql.createConnection(conn);
    connection.connect();
    connection.query(
      "select id from  members where username = '" + params.username + "' and password = password('" + params.password +"');",
      (error, results, fields) => {
        if (error || results.length == 0) {
          response.errorcode = 1;
          response.errormessage = error ? error : 'INVALID PASSWORD';
        } else {
          response.userid = results[0].id;
        }
        cb(response);
      }
    );
    connection.end();
  }
}

function unregister(method, pathname, params, cb) {
  var response = {
    key: params.key,
    errorcode: 0,
    errormessage: 'success'
  };

  if (params.username == null) {
    response.errorcode = 1;
    response.errormessage = 'Invalid Parameters';
    cb(response);   
  } else {
    var connection = mysql.createConnection(conn);
    connection.connect();
    connection.query(
      "delete from members where username = '" + params.username + "';",
      (error, results, fields) => {
        if (error) {
          response.errorcode = 1;
          response.errormessage = error;
        }
        cb(response);
      }
    );
    connection.end();
  } 
}
