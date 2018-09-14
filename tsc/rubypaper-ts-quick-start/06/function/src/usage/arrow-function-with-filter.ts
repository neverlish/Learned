// 06-3-1 익명 함수와 화살표 함수 - 화살표 함수를 필터 메서드에 적용

let numberList = [1, 2, 3, 4, 5];
numberList = numberList.filter(n => {
  return n % 2 === 0;
});

console.log(numberList); // [2, 4]
