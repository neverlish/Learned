'use strict';

var Note = require('../models/Note.model');
var User = require('../models/User.model');

exports.allUsersNotes = function(req, res) {
  // Find all users
  User.find({})
    .sort({
      username: 1
    })
    .exec(function(err, users) {
      if(err) {
        console.log('err getting users');
      } else {
        return res.render('newnote', {
          title: 'New Note',
          users: users
        });
      }
    })
}

exports.createNote = function(req, res) {
  // Creating a new Note
  var newNote = new Note();
  newNote.memberName = req.body.memberName;
  newNote.project = req.body.project;
  newNote.workYesterday = req.body.workYesterday;
  newNote.workToday = req.body.workToday;
  newNote.impediment = req.body.impediment;

  newNote.save(function(err) {
    if(err) {
      var errMsg = 'Sorry, there was an error saving' + err;
      res.render('newnote', {
        title: 'Note - new note(error)',
        message: errMsg
      });
    } else {
      console.log('Meeting note has been saved');
      res.redirect(301, '/');
    }
  });
}

// Filter by Name
exports.noteByMember = function(req, res) {
  var query = Note.find({});
  var filter = req.body.memberName;

  if (filter.length === 0) {
    console.log('no notes found');
  } else {
    query.where({
      memberName: filter
    })
    .sort({
      createdOn: 'desc'
    })
    .exec(function(err, results) {
      res.render('index', {
        notes: results
      });
    });
  }
}
