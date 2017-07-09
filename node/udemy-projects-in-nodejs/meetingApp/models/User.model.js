var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String
});

UserSchema.pre('save', function(next) {
  // capitalize username
  this.username.charAt(0).toLocalUpperCase() + this.username.slice(1);
  next();
});

module.exports = mongoose.model('User', UserSchema);
