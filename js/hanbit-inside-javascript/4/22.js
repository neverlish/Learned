// arguments 객체 예제 코드

// add() 함수
function add(a, b) {
	// arguments 객제 출력
	console.dir(arguments);
	return a+b;
}

console.log(add(1)); // (출력값) NaN
console.log(add(1,2)); // (출력값) 3
console.log(add(1,2,3));; // (출력값) 3