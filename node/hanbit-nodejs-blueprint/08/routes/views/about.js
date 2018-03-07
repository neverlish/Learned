var keystone = require('keystone');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section은 헤더 내비게이션에서 현재 선택된 항목을 지정하는 데 사용된다.
	locals.section = 'about';
	// 인덱스에서 게시글을 보여주는 코드를 추가한다.
	locals.data = {
		abouts: []
	};
	view.on('init', function(next) {
		var q = keystone.list('About').model.find().limit('1');
		q.exec(function(err, results) {
			locals.data.abouts = results;
			next(err);
		});
	});
	// 뷰 렌더링
	view.render('about');
}
