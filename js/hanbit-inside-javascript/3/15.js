// 배열의 length 프로퍼티 변경

var arr = [];
console.log(arr.length); // (출력값) 0

arr[0] = 0; // arr.length = 1
arr[1] = 1; // arr.length = 2
arr[2] = 2; // arr.length = 3
arr[100] = 100;
console.log(arr.length); // (출력값) 101