// 02 - 6 템플릿 리터럴로 동적인 문자열 생성하기

//// ES6 이전에 동적인 문자열을 생성하는 코드
var name = 'mike';
var score = 80;
var msg = 'name: ' + name + ', score/100: ' + score / 100;

//// 템플릿 리터럴을 사용한 코드
const msg2 = `name: ${name}, score/100: ${score / 100}`;

// 여러 줄의 문자열 입력하기
//// ES5에서 여러 줄의 문자열을 생성하는 코드
const age = 30;
const msg3 = 'name : ' + name + '\n' +
  'age: ' + age + '\n' +
  'score: ' + score + '\n';

//// 템플릿 리터럴을 이용해서 여러 줄의 문자열을 생성하는 코드
const msg4 = `name: ${name}
age: ${age}
score: ${score}`;

// 태그된 템플릿 리터럴
//// 태그된 템플릿 리터럴 함수의 구조
function taggedFunc(strings, ...expressions) {
  console.log(strings, expressions);
  console.log(strings.length === expressions.length + 1);
  return 123;
}

const v1 = 10;
const v2 = 20;
const result = taggedFunc`a ${v1} b ${v2}`; // [ 'a ', ' b ', '' ] [ 10, 20 ] true
console.log(result); // 123

//// 태그된 템플릿 리터럴의 파싱 결과 분석
taggedFunc`a-${v1}-b-${v2}-c`; // [ 'a-', '-b-', '-c' ] [ 10, 20 ] true
taggedFunc`a-${v1}-b-${v2}`; // [ 'a-', '-b-', '' ] [ 10, 20 ] true
taggedFunc`${v1}-b-${v2}`; // [ '', '-b-', '' ] [ 10, 20 ] true

//// 일부 문자열을 강조하는 태그된 템플릿 리터럴 함수
function highlight(strings, ...expressions) {
  return strings.reduce(
    (prevValue, str, i) =>
      expressions.length === i
        ? `${prevValue}${str}`
        : `${prevValue}${str}<strong>${expressions[i]}</strong>`,
    ''
  );
}

const result2 = highlight`a ${v1} b ${v2}`;
console.log(result2); // a <strong>10</strong> b <strong>20</strong>