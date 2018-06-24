// 06-1-1 자바스크립트 함수 - 자바스크립트 함수의 불안전성 - 반환 타입을 생략한 함수

function ambiguity(str) {
  return str + 1000;
}

let result = ambiguity("1000");
console.log(typeof result, result); // string 10001000
