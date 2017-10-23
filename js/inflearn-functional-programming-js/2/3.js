// 2 함수형으로 전환하기 - 3 다형성
var {users} = require('../users');
var {_filter, _map} = require('../_')

// 1) _each로 _map, _filter 중복 제거

// 2) 외부 다형성
  // a. array_like, arguments, document.querySelectorAll
console.log(
  [1,2,3,4].map(function(v) {
    return v * 2;
  })
); // [2, 4, 6, 8]

console.log(
  [1, 2, 3, 4].filter(function(val) {
    return val % 2
  })
); // [1, 3]

// console.log(
//   document.querySelectorAll('*').map(function(node) {
//     return node.nodeName;
//   })
// ); // 사용 불가 query 객체 목록은 array가 아님. _map으로 하면 가능
     

// 3) 내부 다형성
  // a. predi, iteratee, mapper
_map([1, 2, 3, 4], function(v) {
  return v + 10;
});
