// 함수를 호출할 때 this 바인딩을 보여주는 예제 코드

var test = 'This is test';
console.log(window.test);

// sayFoo() 함수
var sayFoo = function() {
	console.log(this.test); // sayFoo() 함수 호출 시 this는 전역 객체에 바인딩된다.
}

sayFoo();