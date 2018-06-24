// 03-3-2 symbol 타입 - 속성 키로 사용할 수 있는 심벌 객체

const uniqueKey = Symbol();
let obj = {};

obj[uniqueKey] = 1234;
console.log(obj[uniqueKey]); // 1234
console.log(obj); // { [Symbol()]: 1234 }
