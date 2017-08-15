var add = function(req, res) {
  console.log('coffeeshop 모듈 안에 있는 add 호출됨.');

  var paramName = req.param('name');
  var paramAddress = req.param('address');
  var paramTel = req.param('tel');
  var paramLongitude = req.param('longitude');
  var paramLatitude = req.param('latitude');
  var database = req.app.get('database');

  if (database.db) {
    addCoffeeShop(database, paramName, paramAddress, paramTel, paramLongitude, paramLatitude, function(err, result) {
      if (err) {throw err;}
      if (result) {
        console.dir(result);
        res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
        res.write('<h2>커피숍 추가 성공</h2>');
        res.end();
      } else {
        res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
        res.write('<h2>커피숍 추가 실패</h2>');
        res.end();
      }
    });
  } else {
    res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
    res.write('<h2>데이트베이스 연결 실패</h2>');
    res.end();
  }
}

// 커피숍을 추가하는 함수
var addCoffeeShop = function(database, name, address, tel, longitude, latitude, callback) {
  console.log('addCoffeeShop 호출됨.');

  // CoffeeShopModel 인스턴스 생성
  var coffeeshop = new database.CoffeeShopModel(
    {
      name: name,
      address: address,
      tel: tel,
      geometry: {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    }
  );

  // save() 로 저장
  coffeeshop.save(function(err) {
    if(err) {
      callback(err, null);
      return;
    }

    console.log('커피숍 데이터 추가함.');
    callback(null, coffeeshop);
  });
}

var list = function(req, res) {
  console.log('coffeeshop 모듈 안에 있는 list 호출됨.');

  var database = req.app.get('database');

  if (database.db) {
    // 1. 모든 커피숍 검색
    database.CoffeeShopModel.findAll(function(err, results) {
      if (err) {throw err;}
      if (results) {
        console.dir(results);
        res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
        res.write('<h2>커피숍 리스트</h2>');
        res.write('<div><ul>')

        for (var i=0; i < results.length; i++) {
          var curName = results[i]._doc.name;
          var curAddress = results[i]._doc.address;
          var curTel = results[i]._doc.tel;
          var curLongitude = results[i]._doc.geometry.coordinates[0];
          var curLatitude = results[i]._doc.geometry.coordinates[1];

          res.write('  <li>#' + i + ' : ' + curName + ', ' + curAddress + ', ' + curTel + ', ' + curLongitude + ', ' + curLatitude + '</li>');
        }
        res.write('</ul></div>');
        res.end();
      } else {
        res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
        res.write('<h2>커피숍 리스트 조회 실패</h2>');
        res.end();
      }
    });
  } else {
    res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
    res.write('<h2>데이터베이스 연결 실패</h2>');
    res.end();
  }
}

var findNear = function(req, res) {
  console.log('coffeeshop 모듈 안에 있는 findNear 호출됨.');

  var paramLongitude = req.param('longitude');
  var paramLatitude = req.param('latitude');
  var maxDistance = 1000;
  var database = req.app.get('database');

  if (database.db) {
    // 1. 가까운 커피숍 검색
    database.CoffeeShopModel.findNear(paramLongitude, paramLatitude, maxDistance, function(err, results) {
      if (err) {throw err;}
      if (results) {
        console.dir(results);
        
        if (results.length > 0) {
          res.render('findnear.ejs', {
            result: results[0]._doc,
            paramLatitude: paramLatitude,
            paramLongitude: paramLongitude
          });
        } else {
          res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
          res.write('<h2>가까운 커피숍 데이터가 없습니다.</h2>');
          res.end();  
        }
      } else {
        res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
        res.write('<h2>가까운 커피숍 조회 실패</h2>');
        res.end();
      }
    });
  } else {
    res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
    res.write('<h2>데이터베이스 연결 실패</h2>');
    res.end();
  }
}

var findWithin = function(req, res) {
  console.log('coffeeShop 모듈 안에 있는 findWithin 호출됨.');

  var paramTopLeftLongitude = req.param('topleft_longitude');
  var paramTopLeftLatitude = req.param('topleft_latitude');
  var paramBottomRightLongitude = req.param('bottomright_longitude');
  var paramBottomRightLatitude = req.param('bottomright_latitude');
  var database = req.app.get('database');

  if (database.db) {
    // 1. 가까운 커피숍 검색
    database.CoffeeShopModel.findWithin(paramTopLeftLongitude, paramTopLeftLatitude, paramBottomRightLongitude, paramBottomRightLatitude, function(err, results) {
      if (err) {throw err;}
      if (results) {
        console.dir(results);
        res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
        res.write('<h2>가까운 커피숍</h2>');
        res.write('<div><ul>')
        
        for (var i=0; i < results.length; i++) {
          var curName = results[i]._doc.name;
          var curAddress = results[i]._doc.address;
          var curTel = results[i]._doc.tel;
          var curLongitude = results[i]._doc.geometry.coordinates[0];
          var curLatitude = results[i]._doc.geometry.coordinates[1];

          res.write('  <li>#' + i + ' : ' + curName + ', ' + curAddress + ', ' + curTel + ', ' + curLongitude + ', ' + curLatitude + '</li>');
        }
        res.write('</ul></div>');
        res.end();
      } else {
        res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
        res.write('<h2>가까운 커피숍 조회 실패</h2>');
        res.end();
      }
    });
  } else {
    res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
    res.write('<h2>데이터베이스 연결 실패</h2>');
    res.end();
  }
}

var findCircle = function(req, res) {
  console.log('coffeeShop 모듈 안에 있는 findCircle 호출됨.');

  var paramCenterLongitude = req.param('center_longitude');
  var paramCenterLatitude = req.param('center_latitude');
  var paramRadius = req.param('radius');
  var database = req.app.get('database');

  if (database.db) {
    // 1. 가까운 커피숍 검색
    database.CoffeeShopModel.findCircle(paramCenterLongitude, paramCenterLatitude, paramRadius, function(err, results) {
      if (err) {throw err;}
      if (results) {
        console.dir(results);
        res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
        res.write('<h2>가까운 커피숍</h2>');
        res.write('<div><ul>')
        
        for (var i=0; i < results.length; i++) {
          var curName = results[i]._doc.name;
          var curAddress = results[i]._doc.address;
          var curTel = results[i]._doc.tel;
          var curLongitude = results[i]._doc.geometry.coordinates[0];
          var curLatitude = results[i]._doc.geometry.coordinates[1];

          res.write('  <li>#' + i + ' : ' + curName + ', ' + curAddress + ', ' + curTel + ', ' + curLongitude + ', ' + curLatitude + '</li>');
        }
        res.write('</ul></div>');
        res.end();
      } else {
        res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
        res.write('<h2>가까운 커피숍 조회 실패</h2>');
        res.end();
      }
    });
  } else {
    res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
    res.write('<h2>데이터베이스 연결 실패</h2>');
    res.end();
  }
}

module.exports.add = add;
module.exports.list = list;
module.exports.findNear = findNear;
module.exports.findWithin = findWithin;
module.exports.findCircle = findCircle;
