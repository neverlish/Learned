exports.index = function index(req, res) {
  res.render('index', {title: 'Index'});
}

function login(req, res) {
  res.send('Login');
}

function loginProcess(req, res) {
  res.redirect('/');
}

function chat(req, res) {
  res.send('Chat');
}

module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;
