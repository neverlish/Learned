// 7 순수성, 불변성, 변경 정책 - 2 불변성 - 3 방어적인 얼리기와 복제

var _ = require('underscore');

var a = [1, 2, 3];
a[1] = 42;
console.log(a); // [ 1, 42, 3 ]

Object.freeze(a);

a[1] = 108;
console.log(a); // [ 1, 42, 3 ]

console.log(Object.isFrozen(a)); // true

/////////

var x = [{a: [1, 2, 3], b: 42}, {c: {d: []}}];

Object.freeze(x);

x[0] = ''
console.log(x); // [ { a: [ 1, 2, 3 ], b: 42 }, { c: { d: [] } } ]

x[1]['c']['d'] = 100000;
console.log(x); // [ { a: [ 1, 2, 3 ], b: 42 }, { c: { d: 100000 } } ]

//////////////////

function deepFreeze(obj) {
  if (!Object.isFrozen(obj))
    Object.freeze(obj)
  
  for (var key in obj) {
    if (!obj.hasOwnProperty(key) || !_.isObject(obj[key]))
      continue;

    deepFreeze(obj[key]);
  }
}

var x2 = [{a: [1, 2, 3], b: 42}, {c: {d: []}}];
deepFreeze(x2);

x2[0] = null;
console.log(x2); // [ { a: [ 1, 2, 3 ], b: 42 }, { c: { d: [] } } ]

x2[1]['c']['d'] = 42;
console.log(x2); // [ { a: [ 1, 2, 3 ], b: 42 }, { c: { d: [] } } ]
