// 2 함수형으로 전환하기 - 6 파이프라인, _go, _pipe, 화살표 함수

var {_reduce, _rest, _filter, _map, _get, _curryr, _pipe, _go, _mapr, _filterr} = require('../_');

// 1) pipe

var f1 = _pipe(
  function(a) { return a + 1; },
  function(a) { return a * 2; },
  function(a) { return a * a; });

console.log(f1(1)); // 4

// 2) _go

_go(1,
  function(a) { return a + 1; },
  function(a) { return a * 2; },
  function(a) { return a * a; },
  console.log); // 16

// 3) users에  _go 적용

var {users} = require('../users');

_go(users,
  function(users) {
    return _filter(users, function(user) {
      return user.age >= 30;
    });
  },
  function(users) {
    return _map(users, _get('name'))
  },
  console.log); // [ 'ID', 'BJ', 'JM', 'JI' ]

//////////////

console.log(
  _mapr(function(val) { return val * 2;})([1, 2, 3])); // [ 2, 4, 6 ]

_go(users,
  _filterr(user => user.age >= 30),
  _mapr(_get('name')),
  console.log); // [ 'ID', 'BJ', 'JM', 'JI' ]

_go(users,
  _filterr(user => user.age < 30),
  _mapr(_get('age')),
  console.log); // [ 27, 25, 26, 23 ]

// 4) 화살표 함수 간단히
var a = function (user) { return user.age >= 30; };
var a = user => user.age >= 30;

var add = function (a, b) { return a + b; };
var add = (a, b) => a + b;
var add = (a, b) => {
  return a + b;
};

var add = (a, b) => ({ val: a + b });
