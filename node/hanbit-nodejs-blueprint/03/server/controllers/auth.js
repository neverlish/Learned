// 이메일에서 Gravatar 아이콘 얻기
var gravatar = require('gravatar');
var passport = require('passport');
// GET 메서드용 로그인 페이지
exports.signin = function(req, res) {
	res.render('login', {
		title: 'Login Page',
		message: req.flash('loginMessage')
	});
};
// GET 메서드용 가입 페이지
exports.signup = function(req, res) {
	res.render('signup', {
		title: 'Signup Page',
		message: req.flash('signupMessage')
	});
};
// GET 메서드용 프로필 페이지
exports.profile = function(req, res) {
	res.render('profile', {
		title: 'Profile Page',
		user: req.user,
		avatar: gravatar.url(req.user.email, {s: '100', r: 'x', d: 'retro'}, true)
	});
};
// 로그아웃 함수
exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
}
// 사용자가 로그인했는지 확인
exports.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
};
