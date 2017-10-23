// 2 함수형으로 전환하기 - 4 커링, curry, curryr

// 1) _curry, _curryr

var {_curry, _curryr, _get, _map, _filter} = require('../_');

var add = function (a, b) { return a + b; };
console.log(add(10, 5)); // 15

////

var _add = _curry(function(a, b) { return a+b; });

var add10 = _add(10);
console.log(add10(5)); // 15
console.log(_add(5)(3)); // 8

var add5 = _add(5);
console.log(add5(3)); // 8

console.log(_add(2, 3)); // 5

////////

var sub = _curry(function(a, b) { return a - b; });
console.log(sub(10, 5)); // 5

var sub10 = sub(10);
console.log(sub10(5)); // 5

var subr = _curryr(function(a, b) { return a - b; });

var subr10 = subr(10);
console.log(subr10(5)); // -5


// 2) _get 만들어 좀 더 간단하게 하기

function get(obj, key) {
  return obj == null ? undefined : obj[key];
}

var {users} = require('../users');

var user1 = users[0];
console.log(user1.name); // ID
console.log(get(user1, 'name')); // ID

// console.log(users[10].name); // TypeError: Cannot read property 'name' of undefined
console.log(get(users[10], 'name')); // undefined

console.log(_get('name')(users[10])); // undefined
console.log(_get('name')(users[0])); // ID

var get_name = _get('name');
console.log(get_name(user1)); // ID 
console.log(get_name(users[3])); // PJ

console.log(
  _map( _filter(users, function(user) { return user.age >= 30; }), _get('name'))); 
// [ 'ID', 'BJ', 'JM', 'JI' ]

console.log(
  _map(_filter(users, function(user) { return user.age < 30; }), _get('age'))); 
// [ 27, 25, 26, 23 ]
