// 14 라우팅 - 03 라우트 핸들러는 미들웨어입니다

app.get('/foo', function(req, res, next) {
  if(Math.random() < 0.5) return next();
  res.send('sometimes this');
});

app.get('/foo', function(req, res) {
  res.send('and sometimes that');
});

app.get('/foo',
  function(req, res, next) {
    if (Math.random() < 0.33) return next();
    res.send('red');
  },
  function(req, res, next) {
    if (Math.random() < 0.5) return next();
    res.send('green');
  },
  function(req, res) {
    res.send('blue');
  },
)

///////////

function specials(req, res, next) {
  res.locals.specials = getSpecialsFromDatabase();
  next();
}

app.get('/page-with-specials', specials, function(req, res) {
  res.render('page-with-specials');
});

///////////

function authorize(req, res, next) {
  if(req.session.authorized) return next();
  res.render('not-authorized');
}

app.get('/secret', authorize, function() {
  res.render('secret');
})

app.get('/sub-rosa', authorize, function() {
  res.render('sub-rosa');
})
