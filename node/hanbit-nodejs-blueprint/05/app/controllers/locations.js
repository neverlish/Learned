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
