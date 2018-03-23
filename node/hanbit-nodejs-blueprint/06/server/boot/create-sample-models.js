module.exports = function(app) {
  // 모델 자동화, 앱이 실행될 때마다 데이터베이스는 이 데이터로 교체된다.
  app.dataSources.motorcycleDataSource.automigrate('motorcycle', function(err) {
    if (err) throw err;
    // 컨텐츠를 만드는 간단한 함수
    app.models.Motorcycle.create(
      [
        {
          'make': 'Harley Davidson',
          'image': 'images/heritage.jpg',
          'model': 'heritage Softail',
          'description': 'An Evolution V-twin Engine!',
          'category': 'Cruiser',
          'year': '1986',
          'id': '57337088fabe969f2dd4078e'
        },
      ], function(err, motorcycles) {
        if (err) throw err;
        // 터미널에 성공 메시지 표시
        console.log('Created Motorcycle Model: \n', motorcycles);
      }
    );
  });

  app.dataSources.motorcycleDataSource.automigrate('review', function(err) {
    if (err) throw err;
    // 콘텐츠를 만드는 간단한 함수
    app.models.Review.create(
      [
        {
          'name': 'Jax Teller',
          'email': 'jax@soa.com',
          'id': '57337b82e630a9152ed6554d',
          'review': 'I love the Engine and sound',
          'ObjectId': '57337088fabe969f2dd4078e'
        },
        {
          'name': 'Filip Chibs Telford',
          'email': 'chibs@soa.com',
          'review': 'Emblematic motorcycle of the world',
          'id': '5733845b00f4a48b2edd54cd',
          'ObjectId': '57337088fabe969f2dd4078e'
        },
        {
          'name': 'Clay Morrow',
          'email': 'clay@soa.com',
          'review': 'A classic for the eighties, i love the engine sound',
          'id': '5733845b00f4a48b2edd54ef',
          'ObjectId': '57337088fabe969f2dd4078e'
        }
      ], function(err, reviews) {
        if (err) throw err;
        // 터미널에 성공 메시지 표시
        console.log('Created Review Model: \n', reviews);
      }
    );
  });
};
