//===== 모듈 불러들이기 =====//
var mongodb = require('mongodb');
var mongoose = require('mongoose');

//===== 데이터베이스 연결 =====//
var database;
var UserSchema;
var UserModel

// 데이터베이스에 연결하고 응답 객체의 속성으로 db 객체 추가
function connectDB() {
  // 데이터베이스 연결 정보
  var databaseUrl = 'mongodb://localhost:27017/shopping';

  // 데이터베이스 ㅇ녀결
  mongoose.connect(databaseUrl);
  database = mongoose.connection;

  database.on('error', console.error.bind(console, 'mongoose connection error.'));
  database.on('open', function() {
    console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);

    // user 스키마 및 모델 객체 생성
    createUserSchema();

    // test 진행함
    doTest();

  });
  database.on('disconnected', connectDB);
}

// user 스키마 및 모델 객체 생성
function createUserSchema() {
  // 스키마 정의
  // password를 hashed_password로 변경, default 속성 모두 추가, salt 속성 추가
  UserSchema = mongoose.Schema({
    id: {type: String, required: true, unique: true},
    name: {type: String, index: 'hashed', 'default': ''},
    age: {type: Number, 'default': -1},
    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
  });

  // info를 virtual 메소드로 정의
  UserSchema
    .virtual('info')
    .set(function(info) {
      var splitted = info.split(' ');
      this.id = splitted[0];
      this.name = splitted[1];
      console.log('virtual info 설정함 : %s, %s', this.id, this.name);
    })
    .get(function() {return this.id + ' ' + this.name});
  
  console.log('UserSchema 정의함.');

  // UserModel 정의함
  UserModel = mongoose.model('users4', UserSchema);
  console.log('UserModel 정의함.');
}

function doTest() {
  // UserModel 인스턴스 생성
  // id, name 속성은 할당하지 않고 info 속성만 할당함
  var user = new UserModel({'info': 'test01 소녀시대'});

  // save()로 저장
  user.save(function (err) {
    if(err) {throw err;}

    console.log('사용자 데이터 추가함.');

    findAll();
  });

  console.log('info 속성에 값 할당함.');
  console.log('id: %s, name: %s', user.id, user.name);
}

function findAll() {
  UserModel.find({}, function(err, results) {
    if(err) {throw err;}

    if(results) {
      console.log('조회된 user 문서 객체 #0 -> id: %s, name: %s', results[0]._doc.id, results[0]._doc.name);
    }
  });
}

connectDB();
