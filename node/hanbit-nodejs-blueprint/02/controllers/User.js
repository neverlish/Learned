var models = require('../models/index');
var User = require('../models/user');

// User 만들기
exports.create = function(req, res) {
  // request body를 가진 User 모델 만들기
  models.User.create({
    name: req.body.name,
    email: req.body.email
  }).then(function(user) {
    res.json(user);
  });
};

// User 목록
exports.list = function(req, res) {
  // 전체 User 목록
  models.User.findAll({}).then(function(users) {
    res.json(users);
  });
};
