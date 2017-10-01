// 2 일급 함수와 응용형 프로그래밍 - 1 일급 함수의 특징

var _ = require('underscore');

// 명령형 프로그래밍

var lyrics = [];

for (var bottles = 99; bottles > 0; bottles--) {
  lyrics.push(bottles + ' bottles of beer on the wall');
  lyrics.push(bottles + ' bolltes of beer');
  lyrics.push('Take one down, pass it around');

  if (bottles > 1) {
    lyrics.push((bottles - 1) + ' bottles of beer on the wall');
  } else {
    lyrics.push('No more bottles of beer on the wall');
  }
}

function lyricSegment(n) {
  return _.chain([])
    .push(n + ' bottles of beer on the wall')
    .push(n + ' bottles of beer')
    .push('Take one down, pass it around')
    .tap(function(lyrics) {
      if (n > 1)
      if (n > 1) 
        lyrics.push((n - 1) + ' bottles of beer on the wall');
      else
        lyrics.push('No more bottles of beer on the wall');
    })
    .value();
}

console.log(lyricSegment(9));
/*
[ '9 bottles of beer on the wall',
  '9 bottles of beer',
  'Take one down, pass it around',
  '8 bottles of beer on the wall' ]
*/

function song(start, end, lyricGen) {
  return _.reduce(
    _.range(start, end, -1), 
    function(acc, n) {
      return acc.concat(lyricGen(n));
    },
    []
  );
}

console.log(
  song(99, 0, lyricSegment)
);
/*
[ '99 bottles of beer on the wall',
...
'No more bottles of beer on the wall']
*/

// 프로토타입 기반 객체 지향 프로그래밍

var a = { name: 'a', fun: function() {return this;} };
console.log(a.fun()); // { name: 'a', fun: [Function: fun] }

var bFunc = function() { return this };
var b = { name: 'b', fun: bFunc };
console.log(b.fun()); // { name: 'b', fun: [Function: bFunc] }

// 메타프로그래밍

function Point2D(x, y) {
  this._x = x;
  this._y = y;
}

console.log(new Point2D(0, 1)); // Point2D { _x: 0, _y: 1 }

function Point3D(x, y, z) {
  Point2D.call(this, x, y);
  this._z = z;
}

console.log(new Point3D(10, -1, 100)); // Point3D { _x: 10, _y: -1, _z: 100 }
