// 3 자바스크립트의 변수 - 5 window 객체

// window 객체를 통한 글로벌 변수 접근
var myGlobal = 'am i in window?';
console.log(myGlobal); // 'am i in window?'
console.log(window.myGlobal); // 'am i in window?'

// 글로벌 변수 접근 방법
var myGlobal = 'am i in window?';
var myVariableName = 'myGlobal';

console.log('1. ' + myGlobal);
console.log('2.' + window.myGlobal);
console.log('3.' + window['myGlobal']);
console.log('4.' + window[myVariableName]);

// 글로벌 변수를 이용한 단순 반복 처리 예
var button1 = document.getElementById('button1');
button1.dosomething = 'Dom something same with many buttons, clicked button1';
var button2 = document.getElementById('button2');
button2.dosomething = 'Dom something same with many buttons, clicked button2';
var button3 = document.getElementById('button3');
button3.dosomething = 'Dom something same with many buttons, clicked button3';
var button4 = document.getElementById('button4');
button4.dosomething = 'Dom something same with many buttons, clicked button4';

// eval() 함수를 이용한 반복문 처리 방안
var i;
for (i = 1; i < 5; i++) {
  eval('var button' + i + ' = document.getElementById("button' + i + '");');
  eval('button' + i + '.dosomething = "Do something same with eval, clicked button' + i + '";');
}

// window 객체를 이용한 처리 방안
var i;
for (i = 1; i < 5; i++) {
  window['button' + i] = document.getElementById('button' + i);
  window['button' + i].dosomething = "Do something same without eval, clicked button" + i;
}

// window 객체를 통한 글로벌 함수 호출
function myGlobalFunction() {
  alert('Global function invoked');
}

window['myGlobalFunction']();
window['myGlobalFunction'].call();

// window 객체를 통한 글로벌 함수 정의
(function() {
  window.myGlobalFunction = function() {
    alert('Global function');
  };
}());

myGlobalFunction();
myGlobalFunction.call();
