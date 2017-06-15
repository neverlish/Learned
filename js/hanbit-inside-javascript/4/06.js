// 함수 선언문 방식과 함수 호이스팅

console.log(add(2,3)); // 5

// 함수 선언문 형태로 add() 함수 정의
function add(x,y) {
	return x + y;
}

console.log(add(3,4)); // 8