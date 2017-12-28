// 3 컬렉션 중심 프로그래밍 - 4 접기 – reduce, min_by, max_by
var {users} = require('../users');
var {_reduce, _curryr, _go, _filterr, _get, _reject} = require('../_');

// 1) min, max, min_by, max_by
function _min(data) {
  return _reduce(data, function(a, b) {
    return a < b ? a : b;
  });
}

console.log(_min([1, 2, 4, 10, 5, -4])); // -4

function _max(data) {
  return _reduce(data, function(a, b) {
    return a > b ? a : b;
  })
}

console.log(_max([1, 2, 4, 10, 5, -4])); // 10

function _min_by(data, iter) {
  return _reduce(data, function(a, b) {
    return iter(a) < iter(b) ? a : b;
  })
}

console.log(
  _min_by([1, 2, 4, 10, 5, -4], Math.abs)
); // 1

function _max_by(data, iter) {
  return _reduce(data, function(a, b) {
    return iter(a) > iter(b) ? a : b;
  })
}

console.log(
  _max_by([1, 2, 4, 10, 5, -4, -11], Math.abs)
); // -11

var _min_byr = _curryr(_min_by), _max_byr = _curryr(_max_by);

console.log(
  _min_byr(users, function(user) {
    return user.age;
  })
); // { id: 8, name: 'MP', age: 23 }

console.log(
  _max_by([1, 2, 4, 10, 5, -4], Math.abs)
)

_go(users,
  _filterr(user => user.age >= 30),
  // _min_byr(user => user.age),
  _min_byr(_get('age')),
  console.log); //{ id: 7, name: 'JI', age: 31 }

var _rejectr = _curryr(_reject);

_go(users,
  _rejectr(user => user.age >= 30),
  _max_byr(_get('age')),
  _get('name'),
  console.log); // PJ

// 끝을 내는 함수
// 1) take
// 2) some, every, find

