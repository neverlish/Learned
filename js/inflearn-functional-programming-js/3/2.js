// 3 컬렉션 중심 프로그래밍 - 2 거르기 – reject, compact
var {users} = require('../users');
var {_filterr, _identity, _negate, _reject} = require('../_');

// 1) reject

console.log(
  _filterr(users, function(user) {
    return user.age > 30;
  }));
/*
[ { id: 1, name: 'ID', age: 36 },
  { id: 2, name: 'BJ', age: 32 },
  { id: 3, name: 'JM', age: 32 },
  { id: 7, name: 'JI', age: 31 } ]
*/

console.log(
  _reject(users, function(user) {
    return user.age > 30;
  }));
/*
[ { id: 4, name: 'PJ', age: 27 },
  { id: 5, name: 'HA', age: 25 },
  { id: 6, name: 'JE', age: 26 },
  { id: 8, name: 'MP', age: 23 } ]
*/

// 2) compact

var _compact = _filterr(_identity);

console.log(
  _compact([1, 2, 0, false, null, {}])); // [ 1, 2, {} ]
