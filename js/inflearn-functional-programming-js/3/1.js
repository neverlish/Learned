// 3 컬렉션 중심 프로그래밍 - 1 수집하기 – map, values, pluck
var {users} = require('../users');

var {_mapr, _keys, _identity, _values} = require('../_');

// 1) values

console.log(
  _mapr(users, function(user) {
    return user.name;})); // [ 'ID', 'BJ', 'JM', 'PJ', 'HA', 'JE', 'JI', 'MP' ]

console.log(_values(users[0])); // [ 1, 'ID', 36 ] 
console.log(_keys(users[0])); // [ 'id', 'name', 'age' ]

var a = 10;
console.log( _identity(a) ); // 10

// 2) pluck

function _pluck(data ,key) {
  return _mapr(data, function(obj) {
    return obj[key];
  });
}

console.log(_pluck(users, 'age')); // [ 36, 32, 32, 27, 25, 26, 31, 23 ]
console.log(_pluck(users, 'name')); // [ 'ID', 'BJ', 'JM', 'PJ', 'HA', 'JE', 'JI', 'MP' ]
console.log(_pluck(users, 'id')); // [ 1, 2, 3, 4, 5, 6, 7, 8 ]
