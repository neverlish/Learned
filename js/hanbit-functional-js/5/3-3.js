// 5 함수로 함수 만들기 - 3 부분 적용 - 3 부분 적용 사례: 선행조건

var _ = require('underscore');

var {
  partial1, partial, validator, hasKeys, complement, mapcat, isEven,
  condition1, sqr, zero, uncheckedSqr, checkedSqr, sqrPre
} = require('../functions');


console.log(sqr(10)); // 100
// console.log(sqr(0)); // Error: cannot be zero
// console.log(sqr('')); // Error: arg must be a number

/////////

console.log(sqrPre(_.identity, 10)); // 10
// console.log(sqrPre(_.identity, '')); // Error: arg must be a number
// console.log(sqrPre(_.identity, 0)); // Error: arg must not be zero

/////////

console.log(uncheckedSqr('')); // 0

console.log(checkedSqr(10)); // 100  
// console.log(checkedSqr('')); // Error: arg must be a number
// console.log(checkedSqr(0)); // Error: arg must not be zero

var sillySquare = partial1(
  condition1(validator('should be even', isEven)),
  checkedSqr  
);

console.log(sillySquare(10)); // 100
// console.log(sillySquare(11)); // Error: should be even
// console.log(sillySquare('')); // Error: arg must be a number
// console.log(sillySquare(0)); // Error: arg must not be zero

////////////////

var validateCommand = condition1(
  validator('arg must be a map', _.isObject),
  validator('arg must have the correct keys', hasKeys('msg', 'type'))
);


var createCommand = partial(validateCommand, _.identity);

// console.log(createCommand({})); // Error: arg must have the correct keys
// console.log(createCommand(21)); // Error: arg must be a map,arg must have the correct keys
console.log(createCommand({msg: '', type: ''})); // { msg: '', type: '' }

var createLaunchCommand = partial1(
  condition1(validator('arg must have the count down', hasKeys('countDown'))),
  createCommand
);
// console.log(createLaunchCommand({msg: '', type: ''})); // Error: arg must have the count down
console.log(createCommand({msg: '', type: '', countDown: 10})); // { msg: '', type: '', countDown: 10 }
