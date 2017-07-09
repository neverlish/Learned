var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  memberName: {
    type: String,
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
