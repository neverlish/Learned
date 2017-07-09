var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String
});

module.exports = mongoose.model('User', UserSchema);
