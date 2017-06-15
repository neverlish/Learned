// add() 함수 생성 (함수 표현식 방식)

// add() 함수 표현식
var add = function (x, y) {
	return x + y;
};

var plus = add;

console.log(add(3,4)); // (출력값) 7
console.log(plus(5,6)); // (출력값) 11