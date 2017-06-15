// 배열 요소의 동적 생성

// 빈 배열
var emptyArr = [];
console.log(emptyArr[0]); // (출력값) undefined

// 배열 요소 동적 생성
emptyArr[0] = 100;
emptyArr[3] = 'eight';
emptyArr[7] = true;
console.log(emptyArr); // (출력값) [100, undefined x 2, 'eight', undefined x 3, true]
console.log(emptyArr.length); // (출력값) 8