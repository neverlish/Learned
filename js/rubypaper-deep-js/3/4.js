// 3 자바스크립트의 변수 - 4 글로벌 변수 정의

// 가장 대표적인 글로벌 변수의 예
var myGlobal = 'This is a global variable';

// 다른 프로그래밍 언어와 다른 스코프로 인한 글로벌 변수의 예
for (var i = 0; i < 10; i++) {
  var isGlobal = true;
}

// 일반적인 변수명의 글로벌 변수로 인한 오동작의 예

function addOneToTen() {
  sum = 0;
  for (i = 1; i < 11; i++) {
    sum = sum + i;
  }
  return sum;
}

sum = 0;
for (i = 0; i < 10; i++) {
  sum = sum + addOneToTen();
}
console.log(sum); // 55

// var 키워드를 사용하지 않는 변수 접근의 예
var getVariable = 'global';
(function() {
  var getVariable = 'immediate function';
  insideFunction();
  console.log('2. Immediate function: ' + getVariable); // will I be global?

  function insideFunction() {
    console.log('1. Inside function: ' + getVariable); // immediate function;
    getVariable = 'will I be global?';
  }
}());
console.log('3. Global: ' + getVariable); // global
