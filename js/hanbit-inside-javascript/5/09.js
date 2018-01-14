// 클로저의 활용 - 특정 함수에 사용자가 정의한 객체의 메서드 연결하기 1

function HelloFunc(func) {
  this.greeting = 'hello';
}

HelloFunc.prototype.call = function(func) {
  func ? func(this.greeting) : this.func(this.greeting);
}

var userFunc = function(greeting) {
  console.log(greeting);
}

var objHello = new HelloFunc();
objHello.func = userFunc;
objHello.call();
