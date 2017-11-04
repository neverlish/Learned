// 14 라우팅 - 04 라우트 경로와 정규 표현식

// 라우트 경로에 정규 표현식 메타문자중 +?*() 사용가능

app.get('/user(name)?', function(req, res) {
  res.render('user');
})

app.get('/khaa+n', function(req, res) {
  res.render('khaaan');
})

app.get(/crazy|mad(ness)?|lunacy/, function(req, res) {
  res.render('madness');
})
