var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    bcrypt: true,
    required: true
  }
});

UserSchema.methods = {
  authenticate: function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
      if(err) return callback(err);
      callback(null, isMatch);
    });
  }
}

module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, cb) {
  bcrypt.hash(newUser.password, bcrypt.genSaltSync(SALT_WORK_FACTOR), null, function(err, hash) {
    if(err) throw err;
    newUser.password = hash;
    console.log('User is being saved');

    // SAve user to the database
    newUser.save(cb);
  })
}
