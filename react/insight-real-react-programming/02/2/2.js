// 02 - 2 객체와 배열의 사용성 개선

// 02 - 2 - 2 객체와 배열의 속성값을 간편하게 가져오기

// 전개 연산자

//// 전개 연산자를 이용해서 함수의 매개변수를 입력하기
console.log(Math.max(1, 3, 7, 9)); // 9
const numbers = [1, 3, 7, 9];
console.log(Math.max(...numbers)); // 9

//// 전개 연산자를 이용해서 배열과 객체를 복사하기
const arr1 = [1, 2, 3];
const obj1 = { age: 23, name: 'mike' };
const arr2 = [...arr1];
const obj2 = { ...obj1 };
arr2.push(4);
obj2.age = 80;

//// 배열에서 전개 연산자를 사용하면 순서가 유지된다
[1, ...[2, 3], 4]; // [1, 2, 3, 4]
new Date(...[20188, 11, 24]);

//// 전개 연산자를 이용해서 두 객체를 병합하기
const obj3 = { age: 21, name: 'mike' };
const obj4 = { hobby: 'soccer' };
const obj5 = { ...obj3, ...obj4 };
console.log(obj5); // { age: 21, name: 'mike', hobby: 'soccer' }

//// 객체 리터럴에서 중복된 속성명 사용 가능
const obj6 = { x: 1, x: 2, y: 'a' }; // { x: 2, y: 'a' }
const obj7 = { ...obj6, y: 'b' }; // { x: 2, y: 'b' }

// 배열 비구조화
//// 배열 비구조화를 사용한 간단한 코드
const arr = [1, 2];
const [a, b] = arr;
console.log(a); // 1
console.log(b); // 2

//// 배열 비구조화로 이미 존재하는 변수에 값을 할당하기
let a2, b2;
[a2, b2] = [1, 2];

//// 배열 비구조화에서의 기본값
const arr3 = [1];
const [a3 = 10, b3 = 20] = arr3;
console.log(a3); // 1
console.log(b3); // 20

//// 배열 비구조화를 이용해서 두 변수의 값을 교환하기
let a4 = 1;
let b4 = 2;
[a4, b4] = [b4, a4];
console.log(a4); // 2
console.log(b4); // 1

//// 쉼표를 이용해서 일부 속성값을 건너뛰기
const arr4 = [1, 2, 3];
const [a5, , c5] = arr4;
console.log(a5); // 1
console.log(c5); // 3

//// 나머지 값을 별도의 배열로 만들기
const arr5 = [1, 2, 3];
const [first, ...rest1] = arr5;
console.log(rest1); // [2, 3]
const [a6, b6, c6, ...rest2] = arr5;
console.log(rest2); // []

// 객체 비구조화

//// 객체 비구조화의 예
const obj8 = { age: 21, name: 'mike' };
const { age, name } = obj8;
console.log(age); // 2
console.log(name); // mike

//// 객체 비구조화에서는 속성명이 중요하다
const { a7, b7 } = obj8; // undefined, undefined

//// 객체 비구조화에서 별칭 사용하기
const { age: theAge } = obj8;
console.log(theAge); // 21

//// 객체 비구조화에서 기본값
const obj9 = { age: undefined, name: null, grade: 'A' };
const { age: age2 = 0, name: name2 = 'noName', grade: grade2 = 'F' } = obj9;
console.log(age2); // 0
console.log(name2); // null
console.log(grade2); // A

//// 기본값과 별칭 동시에 사용하기
const obj10 = { age: undefined, name: 'mike' };
const { age: theAge2 = 0 } = obj10;
console.log(theAge2); // 0

//// 함수를 이용한 기본값
function getDefaultAge() {
  console.log('hello');
  return 0;
}
const obj11 = { age: 21, grade: 'A' };
const { age: age3 = getDefaultAge(), grade: grade3 } = obj11; // hello 출력되지 않음
console.log(age3); // 21

//// 객체 비구조화에서 나머지 속성들을 별도의 객체로 생성하기
const obj12 = { age: 21, name: 'mike', grade: 'A' };
const { age: age4, ...rest } = obj12;
console.log(rest); // { name: 'mike', grade: 'A' }

//// for 문에서 객체 비구조화를 활용한 예
const people = [{ age: 21, name: 'mike' }, { age: 51, name: 'sara' }];
for (const { age, name } of people) {
  // ...
}

// 비구조화 심화학습
const obj13 = { name: 'mike', mother: { name: 'sara' } };
const {
  name: name4,
  mother: { name: motherName },
} = obj13;
console.log(name4); // mike
console.log(motherName); // sara
// console.log(mother);

//// 기본값은 변수 단위가 아니라 패턴 단위로 적용된다
const [{ prop: x } = { prop: 123 }] = [];
console.log(x); // 123
const [{ prop: x2 } = { prop: 123 }] = [{}];
console.log(x2); // undefined

//// 객체 비구조화에서 계산된 속성명 사용하기
const index = 1;
const { [`key${index}`]: valueOfIndex } = { key1: 123 };
console.log(valueOfIndex); // 123

//// 별칭을 이용해서 다른 객체와 배열의 속성값 할당
const obj14 = {};
const arr6 = [];
({ foo: obj14.prop, bar: arr6[0] } = { foo: 123, bar: true });
console.log(obj14); // { prop: 123 }
console.log(arr6); // [true]