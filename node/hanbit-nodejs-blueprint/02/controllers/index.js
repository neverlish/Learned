// 샘플 Band 목록
exports.show = function(req, res) {
  // Band 전체 목록을 날짜별로 정렬하기
  var topBands = [
    {
      name: 'Motorhead',
      description: 'Rock and Roll Band',
      album: 'http://s2.vagalume.com/motorhead/discografia/orgasmatron-W320.jpg',
      year: '1986',
    },
    {
      name: 'Judas Priest',
      description: 'Heavy Metal band',
      album: 'http://s2.vagalume.com/judas-priest/discografia/screaming-for-vengeance-W320.jpg',
      year: '1982',
    },
    {
      name: 'Ozzy Osbourne',
      description: 'Heavy Metal Band',
      album: 'http://s2.vagalume.com/ozzy-osbourne/discografia/diary-of-a-madman-W320.jpg',
      year: '1981',
    }
  ];
  res.render('index', {
    title: 'The best albums of the eighties',
    callToAction: 'Please be welcome, click the button below and register your favorite album.',
    bands: topBands
  })
};
