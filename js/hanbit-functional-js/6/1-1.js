// 6 재귀 - 1 자신을 호출하는 함수 - 1 재귀를 이용한 그래프 탐색

var _ = require('underscore');

var {construct, nexts} = require('../functions');

var influences = [
  ['Lisp', 'Smalltalk'],
  ['Lisp', 'Scheme'],
  ['Smalltalk', 'Self'],
  ['Scheme', 'JavaScript'],
  ['Scheme', 'Lua'],
  ['Self', 'Lua'],
  ['Self', 'Javascript']
];

console.log(nexts(influences, 'Lisp')); // [ 'Smalltalk', 'Scheme' ]
