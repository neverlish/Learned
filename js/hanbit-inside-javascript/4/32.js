// apply() 메서드를 활용한 arguments 객체의 배열 표준 메서드 slice 활용 코드

function myFunction() {
	console.dir(arguments);

	// arguments.shift(); 에러 발생

	// arguments 객체를 배열로 변환
	var args = Array.prototype.slice.apply(arguments);
	console.dir(args);
}

myFunction(1, 2, 3);