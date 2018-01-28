// 4 프로토타입과 객체지향, 그리고 상속 - 2 자바스크립트에서의 상속 활용 - 1 기존의 상속 구현 방법

// 초창기 자바스크립트 상속 구현 방법
function Person() {
  this.name = 'anonymous';
  this.job = 'none';
  this.sayHello = function() {
    console.log('Hello, my name is ' + this.name);
  };
}

function Unikys() {
  var obj = new Person();
  obj.name = 'Unikys';
  obj.job = 'Programmer';
  return obj;
}

var unikys = new Unikys();
unikys.sayHello(); // Hello, my name is Unikys

// 초창이 자바스크립트 상속 구현 후 객체 유형 인식 문제
console.log(unikys instanceof Unikys); // false
console.log(unikys instanceof Person); // true

// 객체로 프로토타입을 수정한 자바스크립트 상속 구현
var person2 = {
  name: 'anonymous',
  sayHello: function() {
    console.log('Hello, my name is ' + this.name);
  }
};

function Unikys2() {
  this.name = 'Unikys';
}

Unikys2.prototype = person2;
var unikys2 = new Unikys2();
unikys2.sayHello(); // Hello, my name is Unikys
person2.sayHello(); // Hello, my name is anonymous
console.log(unikys2 instanceof Unikys2); // true

// 프로토타입을 이용한 자바스크립트 상속 구현 방법
function Person3() {
  this.name = 'anonymous';
  this.sayHello = function() {
    console.log('Hello, my name is ' + this.name);
  }; 
}

function Unikys3() {
  this.name = 'unikys';
}
Unikys3.prototype = new Person3();

var unikys3 = new Unikys3();
unikys3.sayHello(); // Hello, my name is unikys
console.log(unikys3 instanceof Unikys3); // true
console.log(unikys3 instanceof Person3); // true
