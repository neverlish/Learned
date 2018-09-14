// 06-2-1 기본 초기화 매개변수 - 기본 초기화 매개변수

function pow(x: number, n: number = 2): number {
  return x ** n;
}

console.log(pow(10)); // 100
console.log(pow(10, 3)); // 1000
