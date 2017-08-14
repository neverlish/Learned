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

  CoffeeShopSchema.index({geomtry: '2dsphere'});
};

module.exports = Schema;


