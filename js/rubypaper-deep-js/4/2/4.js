// 4 프로토타입과 객체지향, 그리고 상속 - 2 자바스크립트에서의 상속 활용 - 4 Object.create 함수의 상속 여부 확인

// Object.create 함수로 생성한 객체의 상속 확인
function Person(name) {
  this.name = name;
}
Person.prototype = {
  yell: function() {
    console.log('My name is ' + this.name);
  }
};

var unikys = Object.create(Person.prototype);

console.log(unikys instanceof Person); // true

// Object.create 함수로 생성한 객체의 상속 확인이 어려운 예
var person = {
  yell: function() {
    console.log('My name is ' + this.name);
  }
};
var unikys = Object.create(person);
unikys.name = 'Unikys';
unikys.yell(); // My name is Unikys

// console.log(unikys instanceof person); // TypeError: Right-hand side of 'instanceof' is not callable

// Object.create 함수로 생성한 객체의 프로토타입 확인
console.log(Object.getPrototypeOf(unikys) === person); // true
console.log(Object.getPrototypeOf(person)); // {}

// Object.create 함수의 인자로 일반 객체를 활용한 경우의 상속 확인
console.log(person.isPrototypeOf(unikys)); // true
console.log(Object.prototype.isPrototypeOf(unikys)); // true
