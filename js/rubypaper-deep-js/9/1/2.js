// 9 자바스크립트 표준 - 1 ECMAScript 6 표준 - 2 함수 화살표 표현식

// 화살표 표현식 예
let myFunc = () => console.log('This is a new function literal');
myFunc();

var myFuncES5 = function() {
  console.log('This is a new function literal');
};
myFuncES5();

// 인자를 받는 화살표 표현식
let paramFunc = (greetings, name) => {
  console.log(greetings + ' , ' + name);
}
paramFunc('Hello', 'World');

var paramFuncES5 = function(greetings, name) {
  console.log(greetings + ' , ' + name);
};
paramFuncES5('Hello', 'World');

// 화살표 표현식의 컨텍스트 비교
var name = 'Global';
function Person() {
  this.name = 'Unikys';

  setTimeout(() => console.log('My name is ' + this.name), 100); // My name is Unikys
  setTimeout(function() {
    console.log('Global name is ' + this.name); // Global name is Global
  }, 100)
}
var person = new Person();

// 화살표 표현식을 활용한 캡슐화 비교
(function() {
  console.log('ES5 IIFE');
}());

(() => {
  console.log('ES6 IIFE');
})();
