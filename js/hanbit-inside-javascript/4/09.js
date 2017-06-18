// 변수나 프로퍼티에 함수값을 할당하는 코드

// 변수에 함수 할당
var foo = 100;
var bar = function() { return 100; };
console.log(bar()); // (출력값) 100

// 프로퍼티에 함수 할당
var obj = {};
obj.baz = function() { return 200; };
console.log(obj.baz()); // (출력값) 200
