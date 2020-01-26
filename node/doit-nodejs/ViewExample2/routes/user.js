/*
 * 데이터베이스 관련 객체들을 init() 메소드로 설정
 * 
 */

var database;
var UserSchema;
var UserModel;


// 데이터베이스 객체, 스키마 객체, 모델 객체를 이 모듈에서 사용할 수 있도록 전달함
var init = function(db, schema, model) {
	console.log('init 호출됨.');
	
	database = db;
	UserSchema = schema;
	UserModel = model;
}


var login = function(req, res) {
	console.log('user 모듈 안에 있는 login 호출됨.');

	// 필요한 경우 req.app.get('database')로 참조 가능
	checkDatabase(req);

	var paramId = req.param('id');
	var paramPassword = req.param('password');
	
	if (database) {
		authUser(database, paramId, paramPassword, function(err, docs) {
			if (err) {throw err;}
			
			if (docs) {
				console.dir(docs);

				var username = docs[0].name;
				
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				
				// 뷰 템플릿을 이용하여 렌더링한 후 전송
				var context = {userid: paramId, username: username};
				req.app.render('login_success', context, function(err, html) {
					if(err) {throw err;}
					console.log('rendered : ' + html);

					res.end(html);
				});
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h1>로그인  실패</h1>');
				res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
				res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
		res.end();
	}
	
};

var adduser = function(req, res) {
	console.log('user 모듈 안에 있는 adduser 호출됨.');

	// 필요한 경우 req.app.get('database')로 참조 가능
	checkDatabase(req);
	
	var paramId = req.param('id');
	var paramPassword = req.param('password');
	var paramName = req.param('name');

	if (database) {
		addUser(database, paramId, paramPassword, paramName, function(err, result) {
			if (err) {throw err;}
			
			if (result) {
				console.dir(result);
 
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				
				// 뷰 템플릿으로 렌더링한 후 전송
				var context = {title: '사용자 추가 성공'};
				req.app.render('adduser', context, function(err, html) {
					if(err) {throw err;}
					res.end(html);
				});
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가  실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};

var listuser = function(req, res) {
	console.log('user 모듈 안에 있는 listuser 호출됨.');

	// 필요한 경우 req.app.get('database')로 참조 가능
	checkDatabase(req);
	
	
	if (database) {
		// 1. 모든 사용자 검색
		UserModel.findAll(function(err, results) {
			if (err) {
				callback(err, null);
				return;
			}
			  
			if (results) {
				console.dir(results);
 
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});

				// 뷰 템플릿을 이용하여 렌더링한 후 전송
				var context = {results: results};
				req.app.render('listuser', context, function(err, html) {
					if(err) {throw err;}
					res.end(html);
				});
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 리스트 조회  실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};


//필요한 경우 req.app.get('database')로 참조 가능 : 현재는 사용하지 않음
var checkDatabase = function(req) {
	if (!database) {
		console.log('user 모듈에서 데이터베이스 객체를 참조합니다.');
		
		database = req.app.get('database');
		UserSchema = database.UserSchema;
		UserModel = database.UserModel;
	} else {
		console.log('user 모듈에서 데이터베이스 객체를 이미 참조했습니다.');
	}
}


//사용자를 인증하는 함수 : 아이디로 먼저 찾고 비밀번호를 그 다음에 비교하도록 함
var authUser = function(database, id, password, callback) {
	console.log('authUser 호출됨.');
	
	// 1. 아이디를 이용해 검색
	UserModel.findById(id, function(err, results) {
		if (err) {
			callback(err, null);
			return;
		}
		
		console.log('아이디 [%s]로 사용자 검색결과', id);
		console.dir(results);
		
		if (results.length > 0) {
			console.log('아이디와 일치하는 사용자 찾음.');
			
			// 2. 패스워드 확인 : 모델 인스턴스를 객체를 만들고 authenticate() 메소드 호출
			var user = new UserModel({id:id});
			var authenticated = user.authenticate(password, results[0]._doc.salt, results[0]._doc.hashed_password);
			if (authenticated) {
				console.log('비밀번호 일치함');
				callback(null, results);
			} else {
				console.log('비밀번호 일치하지 않음');
				callback(null, null);
			}
			
		} else {
	    	console.log("아이디와 일치하는 사용자를 찾지 못함.");
	    	callback(null, null);
	    }
		
	});
	
}


//사용자를 등록하는 함수
var addUser = function(database, id, password, name, callback) {
	console.log('addUser 호출됨.');
	
	// UserModel 인스턴스 생성
	var user = new UserModel({"id":id, "password":password, "name":name});

	// save()로 저장
	user.save(function(err) {
		if (err) {
			callback(err, null);
			return;
		}
		
	    console.log("사용자 데이터 추가함.");
	    callback(null, user);
	     
	});
}


module.exports.init = init;
module.exports.login = login;
module.exports.adduser = adduser;
module.exports.listuser = listuser;

