// 9 자바스크립트 표준 - 2 ECMAScript 2016 - 1 Array.prototype.includes 함수

var array = ['a', 'b', 1, 2, NaN];
console.log(array.includes('a')); // true
console.log(array.includes(2)); // true
console.log(array.includes(NaN)); // true

console.log(array.indexOf('a') >= 0); // true
console.log(array.indexOf(2) !== -1); // true
console.log(array.indexOf(NaN) !== -1); // false?

var includesNaN = false;
for (var i = 0; i < array.length; ++i) {
  if (isNaN(array[i])) {
    includesNaN = true;
  }
}

console.log(includesNaN); // true
