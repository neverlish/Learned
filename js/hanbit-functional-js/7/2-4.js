// 7 순수성, 불변성, 변경 정책 - 2 불변성 - 4 함수 수준에서 불변성 유지하기

var _ = require('underscore');

var {repeatedly, partial1, curry2, rand, skipTake, construct} = require('../functions');

var freq = curry2(_.countBy)(_.identity);

var a = repeatedly(1000, partial1(rand, 2));
var copy = _.clone(a);

console.log(freq(a)); // ex) { '1': 359, '2': 343 }
console.log(_.isEqual(a, copy)); // true

console.log(freq(skipTake(2, a))); // ex) { '1': 177, '2': 156 }

///////

var person = {fname: 'Simon'};
_.extend(person, {lname: 'Petrikov'}, {age: 28}, {age: 108});

console.log(person); // { fname: 'Simon', lname: 'Petrikov', age: 108 }

/////// 

function merge(/* args */) {
  return _.extend.apply(null, construct({}, arguments));
}

var person2 = {fname: 'Simon'};

merge(person2, {lname: 'Petrikov'}, {age: 28}, {age: 108})
console.log(person2); // { fname: 'Simon' }
