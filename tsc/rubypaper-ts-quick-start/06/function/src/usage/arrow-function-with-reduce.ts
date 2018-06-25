// 06-3-1 익명 함수와 화살표 함수 - 화살표 함수를 리듀스 메서드에 적용 - 화살표 함수를 합계 계산(리듀스 메서드)에 적용

function getSum(nums: number[]): number {
  let sum: number = nums.reduce((a, b) => { return a + b; });
  return sum;
}

let numSum = getSum([1, 2, 3, 4, 5]);
console.log(`numSum=${numSum}`); // numSum=15
