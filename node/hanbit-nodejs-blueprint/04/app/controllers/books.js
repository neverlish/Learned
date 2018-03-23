var express = require('express'),
    router = express.Router(),
    schema = require('../models/book'),
    Picture = schema.models.Picture,
    cloudinary = require('cloudinary').v2,
    fs = require('fs'),
    multipart = require('connect-multiparty'),
    multipartMiddleware = multipart();

module.exports = function(app) {
  app.use('/', router);
};

// picture 목록 가져오기
router.get('/books', function(req, res, next) {
  Picture.all().then(function(photos) {
    console.log(photos);
    res.render('book/books', {
      title: 'PhotoBook',
      photos: photos,
      cloudinary: cloudinary
    })
  });
});

// 폼 업로드 가져오기
router.get('/books/add', function(req, res, next) {
  res.render('book/add-photo', {
    title: 'Upload Picture'
  });
});

// 게시하기
router.post('/books/add', multipartMiddleware, function(req, res, next) {
  // 수신한 파일 확인
  console.log(req.files);
  // Picture 모델 생성하기
  var photo = new Picture(req.body);
  // 임시 파일 경로 가져오기
  var imageFile = req.files.image.path;
  // 클라우디너리로 파일 업로드
  cloudinary.uploader.upload(imageFile, {
    tags: 'phptobook',
    folder: req.body.category + '/',
    public_id: req.files.image.originalFilename,
    // eager: {
    //   width: 280, height: 200, crop: 'fill', gravity: 'face'
    // }
  })
  .then(function(image) {
    console.log('Picture uploaded to Cloudinary');
    // 이미지 Json 파일 확인하기
    console.log(image);
    // picture 모델에 이미지 정보 추가하기
    photo.image = image;
    // 사진과 이미지 메타데이터 저장하기
    return photo.save();
  })
  .then(function(photo) {
    console.log('Successfully saved');
    // 로컬 폴더에서 이미지 삭제
    var filePath = req.files.image.path;
    fs.unlinkSync(filePath);
  })
  .finally(function() {
    // 이미지 파일 및 결과 보여주기
    res.render('book/posted-photo', {
      title: 'Upload with Success',
      photo: photo,
      upload: photo.image
    });
  });
});
