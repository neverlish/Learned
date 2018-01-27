// 인덱스 컨트롤러
exports.show = function(req, res) {
  // 인덱스 콘텐츠 보여주기
  res.render('index', {
    title: 'Express'
  });
};
