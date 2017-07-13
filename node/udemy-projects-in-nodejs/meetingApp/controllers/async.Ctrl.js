'use strict';

var Note = require('../models/Note.model');
var User = require('../models/User.model');
var async = require('async');

exports.homePage = function(req, res) {
  // Gather all Notes and all Users
  async.parallel([
    function(cb) {
      var query = Note.find({});
      query.sort({
        createdOn: 'desc'
      })
      .limit(12)
      .exec(function(err, notes) {
        cb(err, notes);
      });
    },

    function(cb) {
      var query = User.find({});
      query.sort({
        username: 1
      })
      .exec(function(err, users) {
        cb(err, users);
      });
    }

  ], function(err, result) {
    if(err) {
      console.log(err);
    } else {
      res.render('index', {
        notes: result[0],
        users: result[1]
      });
    }
  });
}
