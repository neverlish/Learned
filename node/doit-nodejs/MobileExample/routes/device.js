var gcm = require('node-gcm');
var config = require('../config/config.js');

var adddevice = function(req, res) {
  console.log('device 모듈 안에 있는 adddevice 호출됨.');

  var database = req.app.get('database');
  var paramMobile = req.param('mobile');
  var paramOsVersion = req.param('osVersion');
  var paramModel = req.param('model');
  var paramDisplay = req.param('display');
  var paramManufacturer = req.param('manufacturer');
  var paramMacAddress = req.param('macAddress');

  if (database) {
    // DeviceModel 인스턴스 생성
    var device = new database.DeviceModel({
      "mobile": paramMobile,
      "osVersion": paramOsVersion,
      "display": paramDisplay,
      "manufacturer": paramManufacturer,
      "macAddress": paramMacAddress
    });

    // save() 로 저장
    device.save(function(err) {
      if (err) {throw err;}
      console.log('단말 데이터 추가함.');
      console.dir(device);
      res.writeHead('200', {'Content-Type': 'application/json;charset=utf8'});
      res.write("{code: '200', 'message': '단말 데이터 추가 성공'}");
      res.end();
    });
  }
}

var listdevice = function(req, res) {
  console.log('device 모듈 안에 있는 listdevice 호출됨.');

  var database = req.app.get('database');

  if (database) {
    // 1. 모든 사용자 검색
    database.DeviceModel.findAll(function(err, results) {
      if (err) {
        callback(err, null);
        reeturn;
      }

      if (results) {
        console.dir(results);

        var context = {
          title: '단말 목록',
          devices: results
        };

        req.app.render('listdevice', context, function(err, html) {
          res.end(html);
        });
      }
    })
  }
}

var register = function(req, res) {
  console.log('device 모듈 안에 있는 register 호출됨.');

  var database = req.app.get('database');
  var paramMobile = req.param('mobile');
  var paramRegistrationId = req.param('registrationId');

  if (database) {

    // 업데이트
    database.DeviceModel.findOneAndUpdate({mobile: paramMobile}, {registrationId: paramRegistrationId}, {multi: true}, function(err, result) {
      if(err) {throw err;}
      
      if(result) {
        console.log("등록 ID 업데이트함.");
				console.dir(result);
				
				res.writeHead('200', {'Content-Type':'application/json;charset=utf8'});
				res.write("{code:'200', 'message':'등록 ID 업데이트 성공'}");
				res.end();
			} else {
				console.log("등록 ID 업데이트 결과 데이터가 없음.");
				
				res.writeHead('200', {'Content-Type':'application/json;charset=utf8'});
				res.write("{code:'400', 'message':'등록 ID 업데이트 결과 데이터가 없음'}");
				res.end();
			}
		});

	} else {
		res.writeHead('200', {'Content-Type':'application/json;charset=utf8'});
		res.write("{code:'400', 'message':'데이터베이스 연결 실패'}");
		res.end();
	}
}

var sendall = function(req, res) {
  console.log('device 모듈 안에 있는 sendall 호출됨.');

  var database = req.app.get('database');
  var paramData = req.param('data');

  if (database) {
    // 1. 모든 단말 검색
    database.DeviceModel.findAll(function(err, results) {
      if(err) {throw err;}

      if(results) {
        console.dir(results);

        // 등록 ID 만 추출
        var regIds = [];
        for (var i=0; i < results.length; i++) {
          var curId = results[i]._doc.registrationId;
          console.log('등록 ID #' + i + ' : ' + regIds.length);
          regIds.push(curId);
        }
        console.log('전송 대상 단말 수 : ' + regIds.length);

        // node-gcm을 사용해 전송
        var message = new gcm.Message();
        message.addData('command', 'show');
        message.addData('type', 'text/plain');
        message.addData('data', paramData);

        var sender = new gcm.Sender(config.gcm_api_key);
        sender.send(message, regIds, function(err, results) {
          console.log(err);
          if(err) {throw err;}
          console.dir(results);
          res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
          res.write('<h2>푸시 메시지 전송 성공</h2>');
          res.end();
        });
      }
    })
  }
}

module.exports.adddevice = adddevice;
module.exports.listdevice = listdevice;
module.exports.register = register;
module.exports.sendall = sendall;
