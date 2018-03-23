var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Location = mongoose.model('Location');

module.exports = function(app) {
  app.use('/', router);
};

router.get('/locations', function(req, res, next) {
  Location.find(function(err, item) {
    if (err) return next(err);
    res.render('locations', {
      title: 'Locations',
      location: item,
      lat: -23.54312,
      long: -46.642748
    });
  });
});

router.get('/locations/add', function(req, res, next) {
  res.render('add-location', {
    title: 'Insert Locations'
  });
});

router.post('/locations', function(req, res, next) {
  // loc 객체를 request body로 채우기
  var loc = {
    title: req.body.title,
    coordinates: [req.body.long, req.body.lat]
  };
  var locations = new Location(loc);
  // 수신 데이터 저장
  locations.save(function(error, item) {
    if (error) {
      return res.status(400).send({
        message: error
      });
    }
    // res.json({message: 'Success', obj: item})
    res.render('add-location', {
      message: 'Upload with Success',
      obj: item
    });
  });
});

router.post('/nearme', function(req, res, next) {
  // 최대 표시할 레코드의 수 설정
  var limit = req.body.limit || 10;
  // 기본 최장 거리는 10km
  var maxDistance = req.body.distance || 10;
  // coords 객체 설정
  // coords Object = [ <longitude>, <latitude> ]
  var coords = [];
  // 배열 생성
  coords[0] = req.body.longitude;
  coords[1] = req.body.latitude;

  // 위치 찾기
  Location.find({
    'coordinates': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: coords
        },
        // 반지름
        $maxDistance: maxDistance * 1609.34
      }
    }
  }).limit(limit).exec(function(err, stores) {
    if (err) {
      return res.status(500).json(err);
    }
    console.log(123123, stores);
    // res.status(200).json(stores)
    res.render('locations', {
      title: 'Locations',
      location: stores,
      lat: -23.54312,
      long: -46.642748
    });
  });
});
