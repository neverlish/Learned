// 7 순수성, 불변성, 변경 정책 - 1 순수성 - 1 순수성과 테스트의 관계

var {sqr} = require('../functions');

PI = 3.14;

function areaOfACircle(radius) {
  return PI * sqr(radius);
}

console.log(areaOfACircle(3)); // 28.26

PI = 'Magnum'

console.log(areaOfACircle(3)); // NaN
