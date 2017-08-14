var Schema = {};

Schema.createSchema = function(mongoose) {
  // 스키마 정의
  var CoffeeShopSchema = mongoose.Schema({
    name: {type: String, index: 'hashed', 'default': ''},
    address: {type: String, 'default': ''},
    tel: {type: String, 'default': ''},
    geometry: {
      'type': {type: String, 'default': 'Point'},
      coordinates: [{type: 'Number'}]
    },
    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
  })

  CoffeeShopSchema.index({geometry: '2dsphere'});

  // 스키마에 static() 메소드 추가
  // 모든 커피숍 조회
  CoffeeShopSchema.static('findAll', function(callback) {
    return this.find({}, callback);
  });

  return CoffeeShopSchema;
};

module.exports = Schema;


