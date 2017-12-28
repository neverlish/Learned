// 3 컬렉션 중심 프로그래밍 - 5 접기 – group_by, count_by, 조합
var {_curryr, _reduce, _go, _get, _pipe, _keys, _map, _filterr, _reject, _pipe} = require('../_');

var users = [
  { id: 10, name: 'ID', age: 36 },
  { id: 20, name: 'BJ', age: 32 },
  { id: 30, name: 'JM', age: 32 },
  { id: 40, name: 'PJ', age: 27 },
  { id: 50, name: 'HA', age: 25 },
  { id: 60, name: 'JE', age: 26 },
  { id: 70, name: 'JI', age: 31 },
  { id: 80, name: 'MP', age: 23 },
  { id: 90, name: 'FP', age: 13 }
];

// 2) group_by, push

function _push(obj, key, val) {
  (obj[key] = obj[key] || []).push(val);
  return obj;
}

var _group_by = _curryr(function(data, iter) {
  return _reduce(data, function(grouped, val) {
    return _push(grouped, iter(val), val);
  }, {});
});

var _group_byr = _curryr(_group_by);

_go(users,
  _group_byr(function(user) {
    return user.age;
  }),
  console.log);
/*
{ '13': [ { id: 90, name: 'FP', age: 13 } ],
  '23': [ { id: 80, name: 'MP', age: 23 } ],
  '25': [ { id: 50, name: 'HA', age: 25 } ],
  '26': [ { id: 60, name: 'JE', age: 26 } ],
  '27': [ { id: 40, name: 'PJ', age: 27 } ],
  '31': [ { id: 70, name: 'JI', age: 31 } ],
  '32': 
   [ { id: 20, name: 'BJ', age: 32 },
     { id: 30, name: 'JM', age: 32 } ],
  '36': [ { id: 10, name: 'ID', age: 36 } ] }
*/

_go(users,
  _group_byr(_get('age')),
  console.log);
/*
{ '10': [ { id: 90, name: 'FP', age: 13 } ],
  '20': 
   [ { id: 40, name: 'PJ', age: 27 },
     { id: 50, name: 'HA', age: 25 },
     { id: 60, name: 'JE', age: 26 },
     { id: 80, name: 'MP', age: 23 } ],
  '30': 
   [ { id: 10, name: 'ID', age: 36 },
     { id: 20, name: 'BJ', age: 32 },
     { id: 30, name: 'JM', age: 32 },
     { id: 70, name: 'JI', age: 31 } ] }
*/

var _head = function(list) {
  return list[0];
}

_go(users,
  _group_byr(_pipe(_get('name'), _head)),
  console.log)
/*
{ I: [ { id: 10, name: 'ID', age: 36 } ],
  B: [ { id: 20, name: 'BJ', age: 32 } ],
  J: 
   [ { id: 30, name: 'JM', age: 32 },
     { id: 60, name: 'JE', age: 26 },
     { id: 70, name: 'JI', age: 31 } ],
  P: [ { id: 40, name: 'PJ', age: 27 } ],
  H: [ { id: 50, name: 'HA', age: 25 } ],
  M: [ { id: 80, name: 'MP', age: 23 } ],
  F: [ { id: 90, name: 'FP', age: 13 } ] }

*/

// 3) count_by, inc

var _inc = function(count, key) {
  count[key] ? count[key]++ : count[key] = 1;
  return count;
}

var _count_by = _curryr(function(data, iter) {
  return _reduce(data, function(count, val) {
    return _inc(count, iter(val));
  }, {});
});

console.log(
  _count_by(users, function(user) {
    return user.age - user.age % 10;
  })
); // { '10': 1, '20': 4, '30': 4 }

function _each2(list, iter) {
  var keys = _keys(list);
  for (var i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]], keys[i]);
  }
  return list;
}

function _map2(list, mapper) {
  var new_list = [];
  _each2(list, function(val, key) {
    new_list.push(mapper(val, key));
  });
  return new_list;
}

var _mapr = _curryr(_map2), _rejectr = _curryr(_reject);

var _pairs = _mapr((val, key) => {
  return [key, val];
});

console.log(_pairs(users[0])); // [ [ 'id', 10 ], [ 'name', 'ID' ], [ 'age', 36 ] ]

/////////////////////


var _f1 = _pipe(
  _count_by(function(user) { return user.age - user.age % 10; }),
  _mapr((count, key) => `${key}대는 ${count}명입니다.`),
  list => list.join(''),
  console.log);
_f1(users); // 10대는 1명입니다.20대는 4명입니다.30대는 4명입니다.

_go(users, _rejectr(user => user.age < 20), _f1); // 20대는 4명입니다.30대는 4명입니다.
_go(users, _filterr(user => user.age < 20), _f1); // 10대는 1명입니다.
