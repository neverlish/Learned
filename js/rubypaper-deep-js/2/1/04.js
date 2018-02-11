// 2 자바스크립트의 스코프와 클로저 - 1 스코프 - 04 with 구문을 자제해야 하는 이유

// with 구문을 사용한 소스의 모호성

function doSomething(value, obj) {
  with (obj) {
    console.log(value);
    value = 'which scope is this?';
  }
}

// with 구문의 대체 방안
var s = document.getElementById('myDiv').style;
s.background = 'yellow';
s.color = 'red';
s.border = '1px solid black';
