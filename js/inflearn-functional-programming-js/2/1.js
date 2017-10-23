// 2 함수형으로 전환하기 - 1 회원 목록, map, filter
var {users} = require('../users');

// 1. 명령형 코드

  // 1) 30세 이상인 users를 거른다.
var temp_users = [];
for (var i = 0; i < users.length; i++) {
  if (users[i].age >= 30) {
    temp_users.push(users[i]);
  }
}
console.log(temp_users);
/*
[ { id: 1, name: 'ID', age: 36 },
  { id: 2, name: 'BJ', age: 32 },
  { id: 3, name: 'JM', age: 32 },
  { id: 7, name: 'JI', age: 31 } ]
*/

  // 2) 30세 이상인 users의 name를 수집한다.
var names = [];
for (var i = 0; i < temp_users.length; i++) {
  names.push(temp_users[i].name);
}
console.log(names); // [ 'ID', 'BJ', 'JM', 'JI' ]

  // 3) 30세 미만인 users를 거른다.
var temp_users = [];
for (var i = 0; i < users.length; i++) {
  if (users[i].age < 30) {
    temp_users.push(users[i]);
  }
}
console.log(temp_users);
/*
[ { id: 4, name: 'PJ', age: 27 },
  { id: 5, name: 'HA', age: 25 },
  { id: 6, name: 'JE', age: 26 },
  { id: 8, name: 'MP', age: 23 } ]
*/

  // 4) 30세 미만인 users의 age를 수집한다.
var ages = [];
for (var i = 0; i < temp_users.length; i++) {
  ages.push(temp_users[i].age);
}
console.log(ages); // [ 27, 25, 26, 23 ]


// 2. _filter, _map으로 리팩토링

var {_filter, _map} = require('../_')

console.log( _filter(users, function(user) { return user.age >= 30; }) );
/*
[ { id: 1, name: 'ID', age: 36 },
  { id: 2, name: 'BJ', age: 32 },
  { id: 3, name: 'JM', age: 32 },
  { id: 7, name: 'JI', age: 31 } ]
*/

console.log( _filter([1,2,3,4], function(num) { return num % 2; }) ); // [ 1, 3 ]
console.log( _filter([1,2,3,4], function(num) { return !(num % 2); }) ); // [ 2, 4 ]

var over_30 = _filter(users, function(user) { return user.age >= 30});
var names = _map(over_30, function(user) { return user.name; });
console.log(names); // [ 'ID', 'BJ', 'JM', 'JI' ]

var under_30 = _filter(users, function(user) { return user.age < 30; });
var ages = _map(under_30, function(user) { return user.age; });
console.log(ages); // [ 27, 25, 26, 23 ]

console.log(
  _map(
    _filter(users, function(user) { return user.age >= 30; }),
    function(user) { return user.name; })); // [ 'ID', 'BJ', 'JM', 'JI' ]
