// 익스프레스와 라우터 가져오기
var express = require('express');
var router = express.Router();

// Get 메서드
router.get('/', function(req ,res) {
	res.render('index', {
		title: 'Socket.io chat application',
		lead: 'Insert your user name and start talk'
	});
});

module.exports = router;
