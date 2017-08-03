//===== 모듈 불러들이기 =====//
var express = require('express')
  , http = require('http')
  , path = require('path');

var config = require('./config');
var database = require('./database/database');
var route_loader = require('./routes/route_loader');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');

//===== Express 서버 객체 만들기 =====//
var app = express();

//===== Passport 사용 =====//
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//===== 서버 변수 설정 및 static으로 public 폴더 설정  =====//
console.log('config.server_port : %d', config.server_port);
app.set('port', process.env.PORT || 3000);
app.use('/public', express.static(path.join(__dirname, 'public')));

//===== body-parser, cookie-parser, express-session 사용 설정 =====//
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));

//===== Passport 사용 설정 =====//
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// 사용자 인증에 성공했을 때 호출
passport.serializeUser(function(user, done) {
  console.log('serialiseUser() 호출됨.');
  console.dir(user);

  done(null, user);
});

// 사용자 인증 후 사용자 요청이 있을 때마다 호출
passport.deserializeUser(function(user, done) {
  console.log('deserializeUser() 호출됨.');
  console.dir(user);

  done(null, user);
});

// 패스포트 로그인 설정
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  console.log('passport의 local-login 호출됨 : ' + email + ', ' + password);

  var database = app.get('database');
  database.UserModel.findOne({'email': email}, function(err, user) {
    if (err) {return done(err);}

    // 등록된 사용자가 없는 경우
    if (!user) {
      console.log('계정이 일치하지 않음.');
      return done(null, false, req.flash('loginMessage', '등록된 계정이 없습니다.'));
    }

    // 비밀번호를 비교하여 맞지 않는 경우
    var authenticated = user.authenticate(password, user._doc.salt, user._doc.hashed_password)
    if (!authenticated) {
      console.log('비밀번호 일치하지 않음.');
      return done(null, false, req.flash('loginMessage', '비밀번호가 일치하지 않습니다.'));
    }

    // 정상인 경우
    console.log('계정과 비밀번호가 일치함.');
    return done(null, user);
  });
}));

// 패스포트 회원가입 설정
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  var paramName = req.param('name');
  console.log('passport의 local-signup 호출됨 : ' + email + ', ' + password + ', ' + paramName);

  // User.findOne이 blocking 되므로 async 방식으로 변경할 수도 있음
  process.nextTick(function() {
    var database = app.get('database');
    database.UserModel.findOne({'email': email}, function(err, user) {
      // 오류가 발생하면
      if (err) {
        return done(err);
      }

      // 기존에 이메일이 있다면
      if (user) {
        console.log('기존에 계정이 있음');
        return done(null, false, req.flash('signupMessage', '계정이 이미 있습니다.'));
      } else {
        // 모델 인스턴스 객체 만들어 저장
        var user = new database.UserModel({'email': email, 'password': password, 'name': paramName});

        user.save(function(err) {
          if (err) {throw err;}
          console.log('사용자 데이터 추가함.');
          return done(null, user);
        });
      }
    });
  });
}));

//라우팅 정보를 읽어들여 라우팅 설정
route_loader.init(app);

// 홈 화면 - 로그인 링크
app.get('/', function(req, res) {
  console.log('/ 패스 요청됨');
  res.render('index.ejs');
});

// 로그인 폼 링크
app.get('/login', function(req, res) {
  console.log('/login 패스 요청됨.');
  res.render('login.ejs', {message: req.flash('loginMessage')});
});

app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

// 회원가입 폼 링크
app.get('/signup', function(req, res) {
  console.log('/signup 패스 요청됨.');
  res.render('signup.ejs', {message: req.flash('signupMessage')});
});

app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

// 프로필 링크 - 먼저 로그인 여부를 확인할 수 있도록 isLoggedIn 미들웨어 실행
app.get('/profile', isLoggedIn, function(req, res) {
  console.log('/profile 패스 요청됨.');
  console.dir(req.user);

  if (Array.isArray(req.user)) {
    res.render('profile.ejs', {user: req.user[0]._doc});
  } else {
    res.render('profile.ejs', {user: req.user})
  }
});

// 로그인 여부를 알 수 있는 미들웨어
function isLoggedIn(req, res, next) {
  console.log('isLoggedIn 미들웨어 호출됨.');
  
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}

// 로그아웃
app.get('/logout', function(req, res) {
  console.log('/logout 패스 요청됨.');
  req.logout();
  res.redirect('/');
})

//===== 404 에러 페이지 처리 =====//
var errorHandler = expressErrorHandler({
 static: {
   '404': './public/404.html'
 }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );


//===== 서버 시작 =====//
http.createServer(app).listen(app.get('port'), function(){
  console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

  database.init(app, config);
});
