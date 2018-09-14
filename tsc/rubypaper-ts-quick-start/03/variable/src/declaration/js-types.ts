// 03-3-1 자바스크립트의 내장 타입 - 심벌 객체간 비교

let myBoolean = true;
let myNumber = 10;
let myString = "hello";
let myUndefined;
let myNull = null;
let myObject = { name: "happy" };
let myObject2 = [1, 2, 3,];
let myFunction = function (a) { return a; }

console.log('boolean : ' + typeof myBoolean);
console.log('number : ' + typeof myNumber);
console.log('string : ' + typeof myString);
console.log('undefined : ' + typeof myUndefined);
console.log('null : ' + typeof myNull, myNull === null); // null : object true
console.log('object : ' + typeof myObject, typeof myObject2);
console.log('function : ' + typeof myFunction);
console.log('undefined == null : ' + (undefined == null)); // undefined == null : true
console.log('undefined === null : ' + (undefined === null)); // undefined === null : false
