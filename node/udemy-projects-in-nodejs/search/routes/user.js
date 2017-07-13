var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller');

// Define routes here
router.post('/register', controller.register);
router.post('/login', controller.login);

module.exports = router;
