// 이메일에서 gravatar 아이콘 얻기
var gravatar = require('gravatar');
// 코멘트 모델 가져오기
var Comments = require('../models/comments');

// 코멘트 목록
exports.list = function(req, res) {
  // 코멘트 전체 목록을 날짜별로 정렬하기
  Comments.find().sort('-created').populate('user', 'local.email').exec(function(error, comments) {
    if (error) {
      return res.send(400, {
        message: error
      });
    }
    // 결과 렌더링하기
    res.render('comments', {
      title: 'Comments Page',
      comments: comments,
      gravatar: gravatar.url(comments.email, {s: '80', r: 'x', d: 'retro'}, true)
    });
  });
};

// 코멘트 작성
exports.create = function(req, res) {
  // request body를 가진 코멘트 모델 생성하기
  var comments = new Comments(req.body);
  // 현재 사용자 id 설정하기
  comments.user = req.user;
  // 수신 데이터 저장하기
  comments.save(function(error) {
    if (error) {
      return res.send(400, {
        message: error
      });
    }
    // 코멘트 페이지로 리다이렉트하기
    res.redirect('/comments');
  });
};

// 코멘트 인증 미들웨어
exports.hasAuthorization = function(req, res, next) {
  if (req.isAuthenticated())
    return next();
    res.redirect('/login');
};
