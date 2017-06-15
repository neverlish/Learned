// 함수 표현식 방식으로 구현한 팩토리얼 함수

var factorialVar = function factorial(n) {
	if (n <= 1) {
		return 1;
	}
	return n * factorial(n-1);
};

console.log(factorialVar(3)); // (출력값) 6
console.log(factorial(3)); // (출력값) undefined