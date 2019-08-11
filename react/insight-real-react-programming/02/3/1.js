// 02 - 3 강화된 함수의 기능

// 02 - 3 - 1 매개변수에 추가된 기능

// 매개변수 기본값

//// 매개변수에 기본값 주기
function printLog(a = 1) {
  console.log({ a });
}

printLog(); // { a: 1 }

//// 매개변수 기본값으로 함수 호출하기
function getDefault() {
  return 1;
}
function printLog2(a = getDefault()) {
  console.log({ a });
}
printLog2(); // { a: 1 }

//// 매개변수 기본값을 이용해서 필숫값을 표현하는 방법
function required() {
  throw new Error('no parameter');
}
function printLog3(a = required()) {
  console.log({ a });
}
printLog3(10); // { a: 10 }
// printLog3(); // Error: no parameter

// 나머지 매개변수

//// 나머지 매개변수를 사용한 코드
function printLog4(a, ...rest) {
  console.log({ a, rest });
}
printLog4(1, 2, 3); // { a: 1, rest: [ 2, 3 ] }

//// arguments 키워드로 나머지 매개변수 따라 하기
function printLog5(a) {
  const rest = Array.from(arguments).splice(1);
  console.log({ a, rest });
}
printLog5(1, 2, 3); // { a: 1, rest: [ 2, 3 ] }

// 명명된 매개변수

//// 명명된 매개변수의 사용 여부에 따른 가독성 비교
function getValues() {

}

const numbers = [10, 20, 30, 40];
const result1 = getValues(numbers, 5, 25);
const result2 = getValues({ numbers, greatherThan: 5, lessThan: 25 });

//// 명명된 매개변수의 사용 여부에 따른 선택적 매개변수 코드 비교
const result3 = getValues(numbers, undefined, 25);
const result4 = getValues({ numbers, greatherThan: 5 });
const result5 = getValues({ numbers, lessThan: 25 });