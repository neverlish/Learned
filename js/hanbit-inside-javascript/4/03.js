// 기명 함수 표현식의 함수 호출 방법

var add = function sum(x, y) {
	return x + y;
};

console.log(add(3,4)); // (출력값) 7
console.log(sum(3,4)); // (출력값) Uncaught ReferenceError: sum is not defined 에러 발생