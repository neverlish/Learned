// 02 - 7 실행을 멈출 수 있는 제너레이터

// 02 - 7 - 1 제너레이터 이해하기

//// 간단한 제너레이터 함수의 예
function* f1() {
  yield 10;
  yield 20;
  return 'finished';
}
const gen = f1();

//// 제너레이터 객체의 next 메서드 사용하기
function* f2() {
  console.log('f2-1');
  yield 10;
  console.log('f2-2');
  yield 20;
  console.log('f2-3');
  return 'finished';
}

const gen2 = f2();
console.log(gen2.next());
console.log(gen2.next());
console.log(gen2.next());
/*
f2-1
{ value: 10, done: false }
f2-2
{ value: 20, done: false }
f2-3
{ value: 'finished', done: true }
*/

//// 제너레이터 객체의 return 메서드 호출하기
const gen3 = f2();
console.log(gen3.next());
console.log(gen3.return('abc'));
console.log(gen3.next());
/*
f2-1
{ value: 10, done: false }
{ value: 'abc', done: true }
{ value: undefined, done: true }
*/

//// 제너레이터 객체의 throw 메서드 호출하기
function* f3() {
  try {
    console.log('f3-1');
    yield 10;
    console.log('f3-2');
    yield 20;
  } catch (e) {
    console.log('f3-catch', e);
  }
}

const gen4 = f3();
console.log(gen4.next());
console.log(gen4.throw('some error'));
/*
f3-1
{ value: 10, done: false }
f3-catch some error
{ value: undefined, done: true }
*/

// 반복 가능하면서 반복자인 제너레이터 객체

//// 배열은 반복 가능한 객체다
const arr = [10, 20, 30];
const iter = arr[Symbol.iterator]();
console.log(iter.next()); // { value: 10, done: false }

//// 제너레이터 객체는 반복 가능한 객체다
const gen5 = f2();
console.log(gen5[Symbol.iterator]() === gen5); // true

//// 반복 가능한 객체를 이용하는 코드
function* f4() {
  yield 10;
  yield 20;
  yield 30;
}

for (const v of f4()) {
  console.log(v);
}

const arr2 = [...f4()];
console.log(arr);
/*
10
20
30
[ 10, 20, 30 ]
*/