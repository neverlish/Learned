//===== 모듈 불러들이기 =====//
var express = require('express')
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');

//===== Express 서버 객체 만들기 =====//
var app = express();

var mongodb = require('mongodb');

// mongoose 모듈 불러들이기
var mongoose = require('mongoose');

//===== 데이터베이스 연결 =====//
var database;
var UserSchema;
var UserModel;

// 데이터베이스에 연결하고 응답 객체의 속성으로 db 객체 추가
function connectDB() {
  // 데이터베이스 연결 정보
  var databaseUrl = 'mongodb://localhost:27017/shopping';

  // 데이터베이스 연결
  mongoose.connect(databaseUrl);
  database = mongoose.connection;

  database.on('error', console.error.bind(console, 'mongoose connection error.'));
  database.on('open', function() {
    console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);

    // 스키마 정의
    UserSchema = mongoose.Schema({
      id: String,
      name: String,
      password: String
    });
    console.log('UserSchema 정의함.');

    // User 모델 정의
    UserModel = mongoose.model('users', UserSchema);
    console.log('users 정의함.');
  });
  database.on('disconnected', connectDB);
}

//===== 서버 변수 설정 및 static으로 public 폴더 설정  =====//
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


// 사용자를 인증하는 함수
var authUser = function(database, id, password, callback) {
  console.log('authUser 호출됨.');

  // 아이디와 비밀번호를 사용해 검색
  UserModel.find({"id": id, "password": password}, function(err, results) {
    if (err) {
      callback(err, null);
      return;
    }

    console.log('아이디 [%s], 비밀번호 [%s]로 사용자 검색 결과', id, password);
    console.dir(results);

    if (results.length > 0) {
      console.log('일치하는 사용자 찾음.', id, password);
      callback(null, results);
    } else {
      console.log('일치하는 사용자를 찾지 못함.');
      callback(null, null);
    }
  });
};

app.post('/process/login', function(req, res) {
  console.log('/process/login 호출됨.');

  var paramId = req.param('id');
  var paramPassword = req.param('password');

  if (database) {
    console.log(paramId, paramPassword)
    authUser(database, paramId, paramPassword, function(err, docs) {
      if (err) { throw err; }

      if (docs) {
        console.dir(docs);

        res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
        res.write('<h1>로그인 성공</h1>');
        res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
        res.write('<div><p>사용자 이름 : ' + docs[0].name + '</p></div>');
        res.write('<br><br><a href="/public/login.html">다시 로그인하기</a>');
        res.end();
      }
    });
  } else {
    res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
    res.write('<h2>데이터베이스 연결 실패</h2>');
    res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
    res.end();
  }
});

// 사용자를 등록하는 함수
var addUser = function(database, id, password, name, callback) {
  console.log('addUser 호출됨.');

  // UserModel의 인스턴스 생성
  var user = new UserModel({'id': id, 'password': password, 'name': name});

  // save()로 저장
  user.save(function(err) {
    if (err) {
      callback(err, null);
      return;
    }

    console.log('사용자 데이터 추가함.');
    callback(null, user);
  });
};

// 사용자 추가 함수
app.post('/process/addUser', function(req, res) {
  console.log('/process/addUser 호출됨.');
  
  var paramId = req.param('id');
  var paramPassword = req.param('password');
  var paramName = req.param('name');

  if (database) {
    addUser(database, paramId, paramPassword, paramName, function(err, result) {
      if(err) { throw err; }

      if (result) {
        console.dir(result);

        res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
        res.write('<h2>사용자 추가 성공</h2>');
        res.end();
      } else {
        res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
        res.write('<h2>사용자 추가 실패</h2>');
        res.end();
      }
    });
  } else {
    res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
    res.write('<h2>데이터베이스 연결 실패</h2>');
    res.end();
  }
});

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

  connectDB();
});
