//===== 모듈 불러들이기 =====//
var express = require('express')
  , http = require('http')
  , path = require('path');

var config = require('./config/config');
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
var flash = require('connect-flash');

// socket.io 모듈 불러들이기
var socketio = require('socket.io');

// cors 사용 - 클라이언트에서 ajax로 요청하면 CORS 지원
var cors = require('cors');

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

// cors를 미들웨어로 사용하도록 등록
app.use(cors());

// 패스포트 설정
var configPassport = require('./config/passport');
configPassport(app, passport);

//라우팅 정보를 읽어들여 라우팅 설정
route_loader.init(app);

// 패스포트 관련 함수 라우팅
var userPassport = require('./routes/user_passport');
userPassport(app, passport);

//===== 404 에러 페이지 처리 =====//
var errorHandler = expressErrorHandler({
 static: {
   '404': './public/404.html'
 }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );

// 시작된 서버 객체를 반환받습니다
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

  database.init(app, config);
});

// socket.io 서버를 시작합니다
var io = socketio.listen(server);
console.log('socet.io 요청을 받아들일 준비가 되었습니다.');

// 클라이언트가 연결했을 때의 이벤트 처리
io.sockets.on('connection', function(socket) {
  console.log('connection into : ', socket.request.connection._peername);

  // 소켓 객체에 클라이언트 Host, Port 정보 속성으로 추가
  socket.remoteAddress = socket.request.connection._peername.address;
  socket.remotePort = socket.request.connection._peername.port;
});
