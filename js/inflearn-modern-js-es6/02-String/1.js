// 02 String - 1 ES2015 String 에 새로운 메서드들

let str = 'hello world ! ^^ ~~';
let matchstr = 'hello';
let matchstr2 = '^~~';
console.log(str.startsWith(matchstr)); // true
console.log(str.endsWith(matchstr2)); // false
console.log(str.includes('world')); // true
console.log(str.includes('^^^')); // false
