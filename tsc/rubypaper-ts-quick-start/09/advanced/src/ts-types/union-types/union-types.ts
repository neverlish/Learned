// 09-1-1 유니언 타입 - 함수의 매개변수와 반환값에 유니언 타입을 적용

function check(p: string | number | boolean): string | number | boolean {
  if (typeof p === 'string') {
    return p;
  }
  else if (typeof p === 'number') {
    return p;
  } else {
    return p;
  }
}

console.log(typeof check(1), check(1)); // number 1
console.log(typeof check('hello'), check('hello')); // string hello
console.log(typeof check(true), check(true)); // boolean true
