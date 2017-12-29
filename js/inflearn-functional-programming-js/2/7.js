// 2 함수형으로 전환하기 - 7 다형성 높이기, _keys, 에러

var {_each, _mapr, _go, _filterr, _keys, _go} = require('../_');

// 1) _each에 null 넣어도 에러 안나게

_each(null, console.log); // 아무 것도 하지 않음

console.log(_mapr(null, function(v) { return v; })); // []

_go(null,
  _filterr(function(v) { return v % 2; }),
  _mapr(function(v) { return v; }),
  console.log); // []

// 2) _keys 만들기
console.log(Object.keys({name: 'ID', age: 33})); // [ 'name', 'age' ]
console.log(Object.keys([1, 2, 3, 4])); // [ '0', '1', '2', '3' ]
console.log(Object.keys(10)); // []
// console.log(Object.keys(null)); // TypeError: Cannot convert undefined or null to object

// 3) _keys에서도 _is_object인지 검사하여 null 에러 안나게

console.log(_keys({name: 'ID', age: 33})); // [ 'name', 'age' ]
console.log(_keys([1, 2, 3, 4])); // [ '0', '1', '2', '3' ]
console.log(_keys(10)); // []
console.log(_keys(null)); // []

// 4) _each 외부 다형성 높이기

_each(
  { 13: 'ID', 19: 'HD', 29: 'YD' }, 
  function(name) { console.log(name);}); 
/*
ID
HD
YD
*/

console.log(
  _mapr(
    { 13: 'ID', 19: 'HD', 29: 'YD' }, 
    function(name) { return name.toLowerCase();})); 
// [ 'id', 'hd', 'yd' ]

_go(
  { 13: 'ID', 19: 'HD', 29: 'YD' },
  _mapr(function(name) { return name.toLowerCase(); }),
  console.log); // [ 'id', 'hd', 'yd' ]

var users = [
  { id: 1, name: 'ID', age: 36 },
  { id: 2, name: 'BJ', age: 32 },
  { id: 3, name: 'JM', age: 32 },
  { id: 4, name: 'PJ', age: 27 },
  { id: 5, name: 'HA', age: 25 },
  { id: 6, name: 'JE', age: 26 },
  { id: 7, name: 'JI', age: 31 },
  { id: 8, name: 'MP', age: 23 }
];

_go(users,
  _mapr(function(user) { return user.name; }),
  _mapr(function(name) { return name.toLowerCase()}),
  console.log); // [ 'id', 'bj', 'jm', 'pj', 'ha', 'je', 'ji', 'mp' ]


_go(null,
  _mapr(function(user) { return user.name; }),
  _mapr(function(name) { return name.toLowerCase()}),
  console.log); // []

_go(
  {1: users[0], 3: users[2], 5: users[4]},
  // console.log,
  /*
  { '1': { id: 1, name: 'ID', age: 36 },
  '3': { id: 3, name: 'JM', age: 32 },
  '5': { id: 5, name: 'HA', age: 25 } }
  */
  _mapr(function(user) { return user.name.toLowerCase(); }),
  console.log); // [ 'id', 'jm', 'ha' ]
