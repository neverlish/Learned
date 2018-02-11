// 3 자바스크립트의 변수 - 6 글로벌 변수 선언 방법과 차이

// 글로벌 스코프에서의 글로벌 변수 정의
var myGlobal = 'global';

// 하위 스코프에서 var 없이 글로벌 변수 정의
(function() {
  myGlobal = 'myGlobal';
}());

// window 객체를 재정의하는 예제
(function() {
  var window = {
    popup: function() {
      window.open('http://unikys.tistory.com');
    },
    alert: function() {
      alert("I'm not the true alert!");
    },
    open: function() {
      alert('I know where you are going...' + url);
    }
  };
  window.alert();
  window.popup();
}());

// 글로벌 스코프에서 var 키워드로 글로벌 변수 정의
console.log('1: ' + varExists + ', ' + window.hasOwnProperty('varExists')); // 1: undefined, true
var varExists = 'Define a global variable with var keyword';
console.log('2: ' + varExists); // 2: Define a global variable with var keyword

// var 키워드 없이 글로벌 변수 정의
console.log('Exists?: ' + window.hasOwnProperty('noVar')); // Exists?: false
console.log('1: ' + noVar);
noVar = 'Define a global variable without var keyword';
console.log('2: ' + noVar);

// if 구문 안에 변수를 정의하는 예
function optimizedFunc(flag) {
  if (flag) {
    var lotsOfVariables1, lotsOfVariables2, lotsOfVariables3;
    console.log('1: ' + lessVariables);
  } else {
    var lessVariables;
    console.log('2: ' + lotsOfVariables1);
  }
}
optimizedFunc(true); // 1: undefined
optimizedFunc(false); // 2: undefined

// 하나의 var 구문으로 변수를 정의하는 예
function optimizedFunc(flag) {
  var lotsOfVariables1, lotsOfVariables2, lotsOfVariables3, lessVariables;
  if (flag) {
    console.log('1: ' + lessVariables);
  } else {
    console.log('2: ' + lotsOfVariables1);
  }
}
optimizedFunc(true); // 1: undefined
optimizedFunc(false); // 2: undefined
