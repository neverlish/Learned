var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express from server folder' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login Page', message: req.flash('loginMessage') });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup Page', message: req.flash('signupMessage') });
});

router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Profile Page', user: req.user, avatar: gravatar.url(req.user.email, {s: '100', r: 'x', d: 'retro' }, true) });
});

module.exports = router;
