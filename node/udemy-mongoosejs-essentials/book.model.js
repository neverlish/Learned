'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: String,
  published: {
    type: Date,
    default: Date.now
  },
  keywords: Array,
  author: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  // Embedded sub-document
  detail: {
    modelNumber: Number,
    hardcover: Boolean,
    reviews: Number,
    rank: Number
  }
});

module.exports = mongoose.model('Book', BookSchema);
