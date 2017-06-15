// 배열 length 프로퍼티의 명시적 변경

var arr = [0, 1, 2];
console.log(arr.length); // (출력값) 3

arr.length = 5;
console.log(arr); // (출력값) [0, 1, 2, undefined x 2]

arr.length = 2;
console.log(arr); // (출력값) [0, 1]
console.log(arr[2]); // (출력값) undefined