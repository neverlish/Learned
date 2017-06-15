// Function() 생성자 함수를 이용한 add() 함수 생성

var add = new Function('x', 'y', 'return x + y');
console.log(add(3,4)); // (출력값) 7