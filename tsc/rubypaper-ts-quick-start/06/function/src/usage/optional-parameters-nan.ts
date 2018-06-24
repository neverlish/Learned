// 06-2-3 선택 매개변수 - 선택 매개변수를 지정해 함수 호출 시 인수를 생략

function sum(a: number, b?: number): number {
  return a + b;
}

console.log(sum(1)); // NaN
