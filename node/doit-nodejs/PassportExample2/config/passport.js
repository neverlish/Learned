var local_login = require('./passport/local_login');
var local_signup = require('./passport/local_signup');
var facebook =  require('./passport/facebook');

module.exports = function(app, passport) {
  console.log('config/passport 호출됨.');

  // 사용자 인증에 성공했을 때 호출
  passport.serializeUser(function(user, done) {
    console.log('serializeUser() 호출됨.');
    console.dir(user);

    done(null, user);
  });

  // 사용자 인증 후 사용자 요청이 있을 때마다 호출
  passport.deserializeUser(function(user, done) {
    console.log('deserializeUser() 호출됨.');
    console.dir(user);

    done(null, user);
  });

  // 인증 방식 설정
  passport.use('local-login', local_login);
  passport.use('local-signup', local_signup)
  passport.use('facebook', facebook(app, passport));
}
