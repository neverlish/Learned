// 4 고차원 함수 - 3 지금까지 배운 내용을 모두 활용: 객체 검증자

var _ = require('underscore');
var {always, cat, hasKeys, checker, validator} = require('../functions');

var alwaysPasses = checker(always(true), always(true));
console.log(alwaysPasses({})); // []

var fails = always(false);
fails.message = 'a failure in life';
var alwaysFails = checker(fails);
console.log(alwaysFails({})); // [ 'a failure in life' ]

////////

var gonnaFail = checker(validator('ZOMG!', always(false)));
console.log(gonnaFail(100)); // ['ZOMG!']

function aMap(obj) {
  return _.isObject(obj);
}

var checkCommand = checker(validator('must be a map', aMap));
console.log(checkCommand({})); // true
console.log(checkCommand(42)); // [ 'must be a map' ]

/////////

var checkCommand2 = checker(
  validator('must be a map', aMap),
  hasKeys('msg', 'type')
);

console.log(
  checkCommand2({msg: 'blah', type: 'display'})
); []

console.log(
  checkCommand2(32)
); // [ 'must be a map', 'Must have values for keys: msg type' ]
