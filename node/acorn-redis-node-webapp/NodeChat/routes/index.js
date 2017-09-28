var util = require('../middleware/utilities');
var config = require('../config');

exports.index = function index(req, res) {
  res.render('index', {title: 'Index'});
}

function login(req, res) {
  res.render('login', {title: 'Login', message: req.flash('error')});
}

function loginProcess(req, res) {
  var isAuth = util.auth(req.body.username, req.body.password, req.session);
  if (isAuth) {
    res.redirect('/chat');
  } else {
    req.flash('error', 'Wrong Username or Password');
    res.redirect(config.routes.login);
  }
}

function chat(req, res) {
  res.render('chat', {title: 'Chat'});
}

function logOut(req, res) {
  util.logOut(req.session);
  res.redirect('/');
}

module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;
module.exports.logOut = logOut;
