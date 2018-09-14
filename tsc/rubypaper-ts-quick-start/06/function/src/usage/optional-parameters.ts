// 06-2-3 선택 매개변수 - 함수 내부에서 초깃값을 설정

function sum2(a: number, b?: number) {
  if (b === undefined) {
    b = 0;
  }
  return a + b;
}

console.log(sum2(1)); // 1
