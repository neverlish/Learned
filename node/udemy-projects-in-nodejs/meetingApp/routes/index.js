var express = require('express');
var router = express.Router();
var notesCtrl = require('../controllers/notes.Ctrl');
var asyncCtrl = require('../controllers/async.Ctrl');

router.get('/', asyncCtrl.homePage);
router.post('/', notesCtrl.noteByMember)

router.get('/newnote', notesCtrl.allUsersNotes);
router.post('/newnote', notesCtrl.createNote);

module.exports = router;
