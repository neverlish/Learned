// 7 순수성, 불변성, 변경 정책 - 1 순수성 - 5 순수성과 멱등의 관계

var _ = require('underscore');

var {second} = require('../functions');

var a = [1, [10, 20, 30], 3];

var secondTwice = _.compose(second, second);
console.log(second(a) === secondTwice(a)); // false

var dissociativeIdentity = _.compose(_.identity, _.identity);

console.log(_.identity(42) === dissociativeIdentity(42)); // true
