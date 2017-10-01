// 2 일급 함수와 응용형 프로그래밍 - 3 데이터 고찰

var _ = require('underscore');

var zombie = { name: 'Bub', film: 'Day of the Dead' };

console.log(
  _.keys(zombie)
); // [ 'name', 'film' ]

console.log(
  _.values(zombie)
); // [ 'Bub', 'Day of the Dead' ]

console.log(
  _.pluck(
    [
      {title: 'Chthon', author: 'Anthony'},
      {title: 'Grendel', author: 'Gardner'},
      {title: 'After Dark'}
    ],
    'author'
  )
); // [ 'Anthony', 'Gardner', undefined ]

console.log(
  _.pairs(zombie)
); // [ [ 'name', 'Bub' ], [ 'film', 'Day of the Dead' ] ]

console.log(
  _.object(_.map(_.pairs(zombie), function(pair) {
    return [pair[0].toUpperCase(), pair[1]];
  }))
); // { NAME: 'Bub', FILM: 'Day of the Dead' }

console.log(
  _.invert(zombie)
); // { Bub: 'name', 'Day of the Dead': 'film' }

console.log(
  _.keys(_.invert({a: 138, b: 9}))
); // [ '9', '138' ]

console.log(
  _.pluck(
    _.map(
      [
        {title: 'Chthon', author: 'Anthony'},
        {title: 'Grendel', author: 'Gardner'},
        {title: 'After Dark'}
      ],
      function (obj) {
        return _.defaults(obj, {author: 'Unknown'});
      }
    ),
    'author'
  )
); // [ 'Anthony', 'Gardner', 'Unknown' ]


var person = {name: 'Romy', token: 'j3983ij', password: 'tigress'};
var info = _.omit(person, 'token', 'password');
console.log(info); // { name: 'Romy' }

var creds = _.pick(person, 'token', 'password');
console.log(creds); // { token: 'j3983ij', password: 'tigress' }

var library = [
  {title: 'SICP', isbn: '0262010771', ed: 1},
  {title: 'SICP', isbn: '0262510871', ed: 2},
  {title: 'Joy of Clojure', isbn: '1935182641', ed: 1},
];

console.log(
  _.findWhere(library, {title: 'SICP', ed: 2})
); // { title: 'SICP', isbn: '0262510871', ed: 2 }

console.log(
  _.where(library, {title: 'SICP'})
);
/*
[ { title: 'SICP', isbn: '0262010771', ed: 1 },
  { title: 'SICP', isbn: '0262510871', ed: 2 } ]
*/
