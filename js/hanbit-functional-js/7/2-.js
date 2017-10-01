// 7 순수성, 불변성, 변경 정책 - 2 불변성

var _ = require('underscore');

var s = 'Lemongrab';

console.log(s.toUpperCase()); // LEMONGRAB
console.log(s); // Lemongrab

var obj = {lemongrab: 'Earl'};

(function(o) {
  _.extend(o, {lemongrab: 'King'})
})(obj);

console.log(obj); // { lemongrab: 'King' }

