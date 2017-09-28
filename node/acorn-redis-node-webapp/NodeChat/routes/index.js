exports.index = function index(req, res) {
  res.render('index', {title: 'Index'});
}

function login(req, res) {
  res.render('login', {title: 'Login'});
}

function loginProcess(req, res) {
  res.redirect('/');
}

function chat(req, res) {
  res.render('chat', {title: 'Chat'});
}

module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;
