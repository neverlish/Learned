var express = require('express');
var router = express.Router();
var controller = require('../controllers/website.controller');

router.post('/search', controller.searchResults);
router.post('/create', controller.create);

module.exports = router;
