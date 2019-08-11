// 02 - 1 변수를 정의하는 새로운 방법: const, let

// 02 - 1 - 2 var의 문제를 해결하는 const, let

// const, let은 블록 스코프다

//// 블록 스코프에서는 블록을 벗어나면 변수를 사용할 수 없다
if (true) {
  const i = 0;
}
// console.log(i);

//// 블록 스코프에서 같은 이름을 갖는 변수의 사용 예
let foo = 'bar1';
console.log(foo); // bar1
if (true) {
  let foo = 'bar2';
  console.log(foo); // bar2
}
console.log(foo); // bar1

// const, let에서의 호이스팅
//// 변수가 정의된 시점보다 먼저 변수를 사용할 수 없다
// console.log(foo2);
const foo2 = 1;

//// const에서 호이스팅의 역할을 설명하기 위한 예
{
  // console.log(foo2);
  const foo2 = 2;
}

//// var에서 호이스팅의 효과를 확인하는 코드
var foo3 = 1;
(function () {
  console.log(foo3); // undefined
  var foo3 = 2;
})();

// const는 변수를 재할당 불가능하게 만든다

//// const로 정의된 변수만 재할당 불가능하다
const bar = 'a';
// bar = 'b';
var foo3 = 'a';
foo = 'b';
let value = 'a';
value = 'b';

//// const로 정의해도 객체의 내부 속성값은 수정 가능하다
const bar2 = { prop1: 'a' };
bar2.prop1 = 'b';
bar2.prop2 = 123;
console.log(bar2);
const arr = [10, 20]; // { prop1: 'b', prop2: 123 }
arr[0] = 100;
arr.push(300);
console.log(arr); // [100, 20, 300]