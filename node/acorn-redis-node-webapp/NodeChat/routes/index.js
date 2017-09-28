function index(req, res) {
  res.send('Index');
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

module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;
