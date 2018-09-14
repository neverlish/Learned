// 03-3-2 symbol 타입 - 심벌 객체간 비교

let hello = Symbol("hello");
let hello2 = Symbol("hello");
console.log(hello === hello2); // false
console.log(hello, hello2); // Symbol(hello) Symbol(hello)
console.log(typeof hello); // symbol
