// 3 컬렉션 중심 프로그래밍 - 3 찾아내기 - find, find_index, some, every
var {users} = require('../users');
var {_keys, _find, _get, _go, _curryr, _negate, _identity} = require('../_');

// 1) find 만들기
console.log(
  _find(users, function(user) {
     return user.age < 30;
  })); // { id: 4, name: 'PJ', age: 27 }

var _findr = _curryr(_find);

console.log(
  _get(_find(users, function(user) {
    return user.age < 30;
  }), 'name')); // PJ

_go(users,
  _findr(function(user) { return user.id == 5; }),
  _get('name'),
  console.log); // HA

// 2) find_index
function _find_index(list, predi) {
  var keys = _keys(list);
  for (var i = 0, len = keys.length; i < len; i++) {
    if (predi(list[keys[i]])) return i;
  }
  return -1;
}

var _find_indexr = _curryr(_find_index);

console.log(
  _find_index(users, function(user) {
    return user.age < 30;
  })); // 3

_go(users,
  _find_indexr(function(user) { return user.id == 6; }),
  console.log); // 5

// 3) some
function _some(data, predi) {
  // predi = predi || _identity;
  return _find_index(data, predi || _identity) != -1;
}

console.log(
  _some([1, 2, 5, 10, 20], function(val) {
    return val > 10;
  })
); // true

console.log(
  _some([1, 2, 5, 10, 20], function(val) {
    return val > 20;
  })
); // false

// 4) every
function _every(data, predi) {
  return _find_index(data, _negate(predi || _identity)) == -1;
}

console.log(
  _every([1, 2, 5, 10, 20], function(val) {
    return val > 10;
  })
); // false

console.log(
  _every([12, 24, 5, 10, 20], function(val) {
    return val > 3;
  })
); // true

console.log(
  // _some([1, 2, 0, 10], _identity)
  _some([1, 2, 0, 10])
); // true

console.log(
  // _some([null, false, 0], _identity)
  _some([null, false, 0])
); // false

console.log(
  _every([1, 2, 0, 10])
); // false

console.log(
  _every([null, false, 0])
); // false

console.log(
  _every([null, false, 1])
); // false

console.log(
  _every([1, 2, 10])
); // true

console.log(
  _some(users, function(user) {
    return user.age < 20;
  })
); // false
