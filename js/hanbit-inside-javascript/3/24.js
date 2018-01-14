// Array() 생성자 함수를 통한 배열 생성

var foo = new Array(3);
console.log(foo) // (출력값) [undefined, undefined, undefined]
console.log(foo.length); // (출력값) 3

var bar = new Array(1, 2, 3);
console.log(bar); // (출력값) [1, 2, 3]
console.log(bar.length); // (출력값) 3