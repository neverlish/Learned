// 3 자바스크립트의 변수 - 2 new String("")과 "", 그리고 String("")의 차이

// new를 통한 객체 생성
function Person(name, blog) {
  this.name = name;
  this.blog = blog;
}

var unikys = new Person('unikys', 'http://unikys.tistory.com');

console.log(unikys instanceof Person); // true
console.log(unikys instanceof Object); // true
console.log(typeof unikys); // object

// 기본형의 instanceof 결과
console.log(true instanceof Boolean); // false
console.log(true instanceof Object); // false

console.log([0, 1] instanceof Array); // true
console.log({name: 'unikys'} instanceof Object); // true

var color1 = new String('red');
var color2 = 'red';
console.log(color1 == color2); // true
console.log(color1 instanceof String); // true
console.log(color2 instanceof String); // false
console.log(color2 instanceof Object); // false

// 기본형 문자열과 문자열 객체 비교

console.log(color1 === color2); // false
console.log(color1.constructor === String); // true
console.log(color2.constructor === String); // true

// 문자열 생성 방법들
var color1 = new String('red');
var color2 = 'red';
var color3 = String('red');

console.log(color1.toUpperCase()); // RED
console.log(color2.toUpperCase()); // RED
console.log(color3.toUpperCase()); // RED

console.log(color1 instanceof String); // true
console.log(color2 instanceof String); // false
console.log(color3 instanceof String); // false

console.log(typeof color1); // object
console.log(typeof color2); // string
console.log(typeof color3); // string

// ""과 String("")의 비교
console.log(color3 === color2); // true

// String 객체와 기본형 문자열의 속성 설정 비교
var constructorString = new String('unikys');
constructorString.blog = 'http://unikys.tistory.com';
console.log(constructorString.blog === 'http://unikys.tistory.com'); // true

var primitiveString = 'unikys';
primitiveString.blog = 'http://unikys.tistory.com';
console.log(primitiveString.blog === undefined); // true

// String.prototype에 함수 추가 예
String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, '');
}

console.log('        unikys     '.trim() === 'unikys'); // true
