// 03-2-2 지바스크립트의 동적 타이핑 - 자바스크립트 형태의 변수 선언과 동적 타이핑

var width = 10;
var height = 10.0;
var myName = "happy";
var animals = ["tiger", "horse", "rhinoceros"];
var myFullName = { first: "happy", last: 'grammer' };

console.log(typeof width, typeof height); // number number
console.log(typeof myName); // string
console.log(typeof animals, typeof myFullName); // object object

if (typeof width === 'number' && typeof height === 'number') {
  console.log('area : ', width * height); // area :  100
}
