// 1 함수형 프로그래밍 개요 - 1 함수형 프로그래밍 정의, 순수함수

// 순수함수
// - 동일한 인자를 주면 동일한 결과를 주는 함수
// - 외부 상태에 영향을 일으키는 함수
// - 평가 시점이 중요하지 않음
function add(a,b) {
  return a + b;
}

console.log(add(10, 5)); // 15

// --- 순수 함수가 아닌 함수
// --- 동일한 인자를 줘도 동일한 결과를 주지 않는 함수
var c = 10;
function add2(a, b) {
  return a + b + c;
}

console.log(add2(10, 2)); // 22
console.log(add2(10, 3)); // 23
console.log(add2(10, 4)); // 24

c = 20;

console.log(add2(10, 2)); // 32
console.log(add2(10, 3)); // 33
console.log(add2(10, 4)); // 34

// --- 외부 상태에 영향을 일으키는 함수
var c = 20;
function add3(a, b) {
  c = b;
  return a + b;
}

console.log(c); // 20
console.log(add3(20, 30)); // 50
console.log(c); // 30

var obj1 = { val: 10 };

function add4(obj, b) {
  obj.val += b;
}

console.log(obj1.val); // 10
add4(obj1, 20);
console.log(obj1.val); // 30

/////// 다시 순수 함수
var obj2 = { val: 10 };
function add5(obj, b) {
  return { val: obj.val + b };
}

console.log(obj2.val); // 10
var obj3 = add5(obj2, 20);
console.log(obj2.val); // 10
console.log(obj3.val); // 30
