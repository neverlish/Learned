var express = require('express');
var router = express.Router();
var notesCtrl = require('../controllers/notes.Ctrl');

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/newnote', notesCtrl.allUsersNotes);
router.post('/newnote', notesCtrl.createNote);

module.exports = router;
