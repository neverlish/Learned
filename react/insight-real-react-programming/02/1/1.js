// 02 - 1 변수를 정의하는 새로운 방법: const, let

// 02 - 1 - 1 var가 가진 문제

// var의 첫 번째 문제: 함수 스코프

//// 스코프를 벗어나서 변수를 사용하면 에러가 발생한다
function example() {
  var i = 1;
}

// console.log(i);

//// var 키워드 없이 변수를 정의하면 전역 변수가 된다
function example1() {
  i = 1;
}

function example2() {
  console.log(i);
}

example1();
example2(); // 1

//// for 문을 벗어나도 변수가 사라지지 않는다
for (var i = 0; i < 10; i++) {
  console.log(i);
}

console.log(i); // 10

// var의 두 번째 문제: 호이스팅

//// 정의되지 않는 변수 사용하기
//// console.log(myVar); //

//// 변수가 정의된 시점보다 먼저 변수 사용하기
console.log(myVar); // undefined
var myVar = 1;

//// 호이스팅의 결과
var myVar = undefined;
console.log(myVar); // undefined
myVar = 1;

//// 변수가 정의된 시점보다 먼저 변수에 값을 할당하기
console.log(myVar2); // undefined
myVar2 = 2;
console.log(myVar2); // 2
var myVar2 = 1;

// var의 기타 문제들

//// var 변수는 재정의가 가능하다
var myVar = 1;
var myVar = 2;