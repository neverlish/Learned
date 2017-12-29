// 1 함수형 프로그래밍 개요 - 2 일급함수, add_maker, 함수로 함수 실행하기

// 일급 함수

var f1 = function(a) {return a * a};
console.log(f1); // [Function: f1]

function f3(f) {
  return f();
}

console.log( f3(function() { return 10; }) ); // 10
console.log( f3(function() { return 20; }) ); // 20

// add_maker

function add_maker(a) {
  return function(b) {
    return a + b;
  }
}

var add10 = add_maker(10);
console.log( add10(20) ); // 30

var add5 = add_maker(5);
var add15 = add_maker(15);

console.log(add5(10)); // 15
console.log(add15(10)); // 25
