// 7 순수성, 불변성, 변경 정책 - 2 불변성 - 1 숲에서 나무가 쓰러질 때 소리가 나는가?

var _ = require('underscore');

var {skipTake} = require('../functions');

console.log(skipTake(2, [1, 2, 3, 4])); // [1, 3]
console.log(skipTake(3, _.range(20))); // [ 0, 3, 6, 9, 12, 15, 18 ]


