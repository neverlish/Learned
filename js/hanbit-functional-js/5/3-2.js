// 5 함수로 함수 만들기 - 3 부분 적용 - 2 임의의 수의 인자를 부분 적용

var _ = require('underscore');
var {partial, div} = require('../functions');

var over10Partial = partial(div, 10);
console.log(over10Partial(2)); // 5

var div10By2By4By5000Partial = partial(div, 10, 2, 4, 5000);
console.log(div10By2By4By5000Partial()); // 5
