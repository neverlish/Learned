// splice() 메서드를 이용한 배열 프로퍼티 삭제

var arr = ['zero', 'one', 'two', 'three'];

arr.splice(2, 1); // 2번째 요소를 시작점으로 1개의 원소를 삭제한다
console.log(arr); // (출력값) ['zero', 'one', 'three'];
console.log(arr.length); // (출력값) 3