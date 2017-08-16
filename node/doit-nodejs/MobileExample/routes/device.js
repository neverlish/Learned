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

module.exports.adddevice = adddevice;
module.exports.listdevice = listdevice;
