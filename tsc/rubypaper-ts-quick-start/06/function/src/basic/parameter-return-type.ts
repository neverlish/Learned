// 06-1-2 타입 안전성을 갖춘 타입스크립트 함수 - 함수의 매개변수 타입과 반환 타입을 지정

function max(x: number, y: number): number {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

let a = max(1, 2);
// let b = max("abc", "ABC"); // Argument of type '"abc"' is not assignable to parameter of type 'number'.

console.log(`a=${a}`); // a=2

