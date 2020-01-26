var Schema = {};

Schema.createSchema = function(mongoose) {
  // 스키마 정의
  var DeviceSchema = mongoose.Schema({
    mobile: {type: String, index: 'hashed', 'default': ''},
    osVersion: {type: String, 'default': ''},
    model: {type: String, 'default': ''},
    display: {type: String, 'default': ''},
    manufacturer: {type: String, 'default': ''},
    macAddress: {type: String, 'default': ''},
    registrationId: {type: String, 'default': ''},
    created_at: {type: Date, index: {unique: true}, 'default': Date.now},
    updated_at: {type: Date, index: {unique: true}, 'default': Date.now}
  });

  // 입력된 칼럼의 값이 있는지 확인
  DeviceSchema.path('mobile').validate(function(mobile) {
    return mobile.length;
  }, 'mobile 칼럼의 값이 없습니다.');

  // 스키마에 static 메소드 추가
  DeviceSchema.static('findByMobile', function(mobile, callback) {
    return this.find({mobile: mobile}, callback);
  });

  DeviceSchema.static('findAll', function(callback) {
    return this.find({}, callback);
  });

  DeviceSchema.static('load', function(options, callback) {
    options.select = options.select || 'mobile';
    this.findOne(options.criteria)
      .select(options.select)
      .exec(callback);
  });

  // 모델에 스키마 등록
  mongoose.model('Device', DeviceSchema);
  console.log('DeviceSchema 정의함');
  return DeviceSchema;
};

// module.exports에 DeviceSchema 직접 할당함
module.exports = Schema;
