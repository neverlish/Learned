// 5 함수로 함수 만들기 - 4 함수의 끝을 서로 연결하는 함수 조립 방법 - 1 조립을 이용해서 선행조건과 후행조건 만들기

var _ = require('underscore');

var {sqrPost, megaCheckedSqr} = require('../functions');

// console.log(sqrPost(_.identity, 0)); // Error: result shoud not be zero,result should be positive
// console.log(sqrPost(_.identity, -1)); // Error: result should be positive
console.log(sqrPost(_.identity, 100)); // 100

/////

console.log(megaCheckedSqr(10)); // 100
// console.log(megaCheckedSqr(0)); // Error: arg must not be zero
// console.log(megaCheckedSqr(NaN)); // Error: result should be positive

