// 14 라우팅 - 05 라우트 매개변수

var staff = {
  mitch: {bio: 'Mitch is the man to have at your back in a bar fight.'},
  madeline: {bio: 'Madeline is our Oregon expert.'},
  walt: {bio: 'Walt if our Oregon Coast expert'},
};

app.get('/staff/:name', function(req, res) {
  var info = staff[req.params.name];
  if (!info) return next(); // 마지막엔 404가 될 겁니다.
  res.render('staffer', {'info': info});
});

//////////////

var staff2 = {
  portland: {
    mitch: {bio: 'Mitch is the man to have at your back '},
    madeline: {bio: 'Madeline is our Oregon expert.'},
  },
  bend: {
    walt: {bio: 'Walt if our Oregon Coast expert'},
  }
};

app.get('/staff/:city/:name', function(req, res) {
  var info = staff2[req.params.city][req.params.name];
  if (!info) return next(); // 마지막엔 404가 될 겁니다.
  res.render('staffer', {'info': info});
});
