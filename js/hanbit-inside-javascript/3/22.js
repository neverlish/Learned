// delete 연산자를 이용한 배열 프로퍼티 삭제

var arr = ['zero', 'one', 'two', 'three'];
delete arr[2];
console.log(arr); // (출력값) ['zero', 'one', undefined x 1, 'three']
console.log(arr.length); // (출력값) 4