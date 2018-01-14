// 함수 형식에 맞춰 인자를 넘기지 않더라도 함수 호출이 가능함을 나타내는 예제 코드
function func(arg1, arg2) {
	console.log(arg1, arg2);
}

func(); // (출력값) undefined, undefined
func(1); // (출력값) 1 undefined
func(1,2); // (출력값) 1 2
func(1,2,3); // (출력값) 1 2