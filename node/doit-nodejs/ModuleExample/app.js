//===== 모듈 불러들이기 =====//
var express = require('express')
  , http = require('http')
  , path = require('path');

var user = require('./routes/user');

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

// crypto 모듈 불러들이기
var crypto = require('crypto');

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

    // user 스키마 및 모델 객체 생성
    createUserSchema();

  });
  database.on('disconnected', connectDB);
}

// user 스키마 및 모델 객채 생성
function createUserSchema() {

  // user_schema.js 모듈 불러들이기
  UserSchema = require('./database/user_schema').createSchema(mongoose);
  
  // UserModel 정의함
  UserModel = mongoose.model('users3', UserSchema);
  console.log('UserModel 정의함.');

  // init 호출
  user.init(database, UserSchema, UserModel);
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

app.post('/process/login', user.login);

// 사용자 추가 함수
app.post('/process/adduser', user.adduser);

// 사용자 리스트 함수
app.post('/process/listuser', user.listuser);

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
