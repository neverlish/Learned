var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberNameValidator = [
  function(val) {
    return (val.length > 0 && val != '(Select Name)');
  },
  // custom error text
  'Select a valid member name.'
]

var NoteSchema = new Schema({
  memberName: {
    type: String,
    validate: memberNameValidator
  },
  project: {
    type: String,
    required: true
  },
  workYesterday: {
    type: String,
  },
  workToday: {
    type: String,
    required: true
  },
  impediment: {
    type: String,
    required: true,
    default: 'none'
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Note' , NoteSchema)
