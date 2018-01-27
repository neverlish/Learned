var models = require('../models/index');
var Band = require('../models/band');

// Band 만들기
exports.create = function(req, res) {
  // request body를 가진 Band 모델 만들기
  models.Band.create(req.body).then(function(band) {
    // res.json(band);
    res.redirect('/bands');
  });
};

// Band 목록
exports.list = function(req, res) {
  // Band 전체 목록을 날자별로 정렬하기
  models.Band.findAll({
    // 정렬: 최근 생성된 순으로
    order: [['createdAt' ,'DESC']]
  }).then(function(bands) {
    // res.json(bands);
    // 결과 렌더링하기
    res.render('band-list', {
      title: 'List bands',
      bands: bands
    });
  });
};

// Band id로 얻기
exports.byId = function(req, res) {
  models.Band.find({
    where: {
      id: req.params.id
    }
  }).then(function(band) {
    res.json(band);
  });
}

// id로 업데이트하기
exports.update = function(req, res) {
  models.Band.find({
    where: {
      id: req.params.id
    }
  }).then(function(band) {
    if (band) {
      band.updateAttributes({
        name: req.body.name,
        description: req.body.description,
        album: req.body.album,
        year: req.body.year,
        UserId: req.body.user_id
      }).then(function(band) {
        res.send(band);
      });
    }
  });
}

// id로 삭제하기
exports.delete = function(req, res) {
  models.Band.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(band) {
    res.json(band);
  });
}
