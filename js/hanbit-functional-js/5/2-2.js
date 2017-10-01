// 5 함수로 함수 만들기 - 2 커링 - 2 자동 커링 파라미터

var _ = require('underscore');

var {div, curry2} = require('../functions');

function curry(fun) {
  return function(arg) {
    return fun(arg);
  }
}

console.log(
  ['11','11','11','11'].map(parseInt)
); // [ 11, NaN, 3, 4 ]

console.log(
  ['11','11','11','11'].map(curry(parseInt))
); // [ 11, 11, 11, 11 ]

var div10 = curry2(div)(10);
console.log(div10(50)); // 5

var parseBinaryString = curry2(parseInt)(2);
console.log(parseBinaryString('111')); // 7
console.log(parseBinaryString('10')); // 2

////// 커링으로 새로운 함수 만들기

var plays = [
  {artist: 'Burial', track: 'Archangel'},
  {artist: 'Ben Frost', track: 'Stomp'},
  {artist: 'Ben Frost', track: 'Stomp'},
  {artist: 'Burial', track: 'Archangel'},
  {artist: 'Emeralds', track: 'Snores'},
  {artist: 'Burial', track: 'Archangel'}
];

console.log(
  _.countBy(plays, function(song) {
    return [song.artist, song.track].join(' - ');
  })
);
/*
{ 'Burial - Archangel': 3,
  'Ben Frost - Stomp': 2,
  'Emeralds - Snores': 1 }
*/

function songToString(song) {
  return [song.artist, song.track].join(' - ');
}

var songCount = curry2(_.countBy)(songToString);
console.log(songCount(plays));
/*
{ 'Burial - Archangel': 3,
  'Ben Frost - Stomp': 2,
  'Emeralds - Snores': 1 }
*/

///////// 세 개의 파라미터를 커링해서 HTML 16진 색상으로 생성기 구현하기

function curry3(fun) {
  return function(last) {
    return function(middle) {
      return function(first) {
        return fun(first, middle, last);
      }
    }
  }
}

var songsPlayed = curry3(_.uniq)(false)(songToString);
console.log(songsPlayed(plays));
/*
[ { artist: 'Burial', track: 'Archangel' },
  { artist: 'Ben Frost', track: 'Stomp' },
  { artist: 'Emeralds', track: 'Snores' } ]
*/

function toHex(n) {
  var hex = n.toString(16);
  return (hex.length < 2) ? [0, hex].join('') : hex;
}

function rgbToHexString(r, g, b) {
  return ['#', toHex(r), toHex(g), toHex(b)].join('');
}

console.log(rgbToHexString(255, 255, 255)); // #ffffff

var blueGreenish = curry3(rgbToHexString)(255)(200);
console.log(blueGreenish(0)); // #00c8ff
