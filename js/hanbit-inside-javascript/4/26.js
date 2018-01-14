// 내부 함수의 this 바인딩 동작을 보여주는 예제 코드

// 전역 변수 value 정의
var value = 100;

// myObject 객체 생성
var myObject = {
	value: 1,
	func1: function() {
		this.value += 1;
		console.log('func1() called. this.value : ' + this.value); // 2

		// func2() 내부 함수
		func2 = function() {
			this.value += 1;
			console.log('func2() called. this.value : ' + this.value); // 100

			// func3() 내부 함수
			func3 = function() {
				this.value += 1;
				console.log('func3() called. this.value : ' + this.value); // 101
			}

			func3(); // func3() 내부 함수 호출
		}

		func2(); // func2() 내부 함수 호출
	}
};

myObject.func1(); // func1() 메서드 호출