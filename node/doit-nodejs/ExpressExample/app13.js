var express = require('express')
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

// 파일 업로드용 미들웨어 불러들이기
var multer = require('multer');
var fs = require('fs');

// 오류 핸들러 사용
var expressErrorHandler = require('express-error-handler');

var app = express();

app.use('/public',express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));

// multer 미들웨어 사용하기
app.use(multer({
  dest: 'uploads',
  putSingleFilesInArray: true,
  limits: {
    fiels: 10,
    fileSize: 2014 * 2014
  },
  rename: function(fieldname, filename) {
    return filename + Date.now();
  },
  onFileUploadStart: function(file) {
    console.log('파일 업로드 시작 : ' + file.originalname);
  },
  onFileUploadComplete: function(file, req, res) {
    console.log('파일 업로드 완료 : ' + file.fieldname + ' -> ' + file.path);
  },
  onFileSizeLimit: function(title) {
    console.log('파일 크기 제한 초과 : %s', file.originalname);
  }
/*
})); 책에 나온 코드
*/
}).single('photo'));

app.get('/process/users/:id', function(req, res) {
  // 토큰 정보를 가져옴
  var paramId = req.params.id;

  console.log('/process/users와 토큰 %s르 사용해 처리함.', paramId);

  res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
  res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
  res.write('<div><p>Param id : ' + paramId + '</p></div>');
});

app.get('/process/product', function(req, res) {
  console.log('/process/product 호출됨.');

  if (req.session.user) {
    res.redirect('/public/product.html');
  } else {
    res.redirect('/public/login2.html');
  }
})

app.post('/process/login', function(req, res, next) {
  console.log('/process/login 요청을 처리함.');

  var paramId = req.param('id');
  var paramPassword = req.param('password');

  if (req.session.user) {
    // 이미 로그인된 상태
    console.log('이미 로그인되어 상품 페이지로 이동합니다.');

    res.redirect('/public/product.html');
  } else {
    // 세션 저장
    req.session.user = {
      id: paramId,
      name: '소녀시대',
      authorized: true
    };
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf8'});
    res.write('<h1>로그인 성공</h1>');
    res.write('<div><p>Param id : ' + paramId + '</p></div>');
    res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
    res.write('<br><br><a href="/process/product">상품 페이지로 이동하기</a>');
    res.end();
  }
});

app.get('/process/logout', function(req, res) {
  console.log('/process/logout 호출됨.');

  if (req.session.user) {
    req.session.destroy(function(err) {
      if (err) {throw err;}

      console.log('세션을 삭제하고 로그아웃되었습니다.');
      res.redirect('/public/login2.html');
    });
  } else {
    // 로그인 안 된 상태
    console.log('아직 로그인되어 있지 않습니다.');

    res.redirect('/public/login2.html');
  }
})

// 쿠키 정보를 확인함
app.get('/process/showCookie', function(req, res) {
  console.log('/process/showCookie 호출됨.');

  res.send(req.cookies);
});

// 쿠키에 이름 정보를 설정함
app.get('/process/setUserCookie', function(req, res) {
  console.log('/process/setUserCookie 호출됨.');

  // 쿠키 설정
  res.cookie('user', {
    id: 'mike',
    name: '소녀시대',
    authorized: true
  });

  // redirect로 응답
  res.redirect('/process/showCookie');
});

app.post('/process/photo', function(req, res) {
  console.log('/process/photo 호출됨.');

  // var files = req.files.photo; 책에 나온 코드

  var files = req.file;

  // 현재의 파일 정보를 저장할 변수 선언
  var originalname = '',
      name = '',
      mimetype = '',
      size = 0;
  
  console.log(files);

  if (Array.isArray(files)) { // 배열에 들어 있는 경우
    console.log('배열에 들어 있는 파일 개수 : %d', files.length);
    for (var index = 0; index < files.length; index++) {
      originalname = files[index].originalname;
      name = files[index].name;
      mimetype = files[index].mimetype;
      size = files[index].size;
    }
  } else { // 배열에 들어가 있지 않은 경우 (현재 설정에서는 해당 없음음
    console.log('파일 개수 : 1');

    originalname = files.originalname;
    name = files.filename;
    mimetype = files.mimetype;
    size = files.size;
  }

  console.log('현재 파일 정보 : ' + originalname + ', ' + name + ', ' + mimetype + ', ' + size);

  // 클라이언트에 응답 전송
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf8'});
  res.write('<h3>파일 업로드 성공</h3>');
  res.write('<hr/>');
  res.write('<p>원본 파일 이름 : ' + originalname + ' -> 저장 파일 이름 : ' + name + '</p>');
  res.write('<p>MIME TYPE : ' + mimetype + '</p>');
  res.write('<p>파일 크기 : ' + size + '</p>');
  res.end();
})

// 모든 router 처리 끝난 후 404 오류 페이지 처리
var errorHandler = expressErrorHandler({
  static: {
    '404': './public/404.html'
  }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(3000, function() {
  console.log('Express 서버가 3000번 포트에서 시작됨.');
});
