// 4 프로토타입과 객체지향, 그리고 상속 - 2 자바스크립트에서의 상속 활용 - 6 Object.create와 new 키워드 조합

// Object.create 함수와 new 키워드를 조합한 활용 예
function Person() {
  this.name = 'anonymous';
}
function Unikys() {
  this.name = 'unikys';
}
Unikys.prototype = Object.create(Person.prototype, {
  constructor: {
    value: Unikys
  }
});

var unikys = new Unikys();
console.log(unikys instanceof Unikys); // true
console.log(unikys instanceof Person); // true
console.log(unikys.constructor); // [Function: Unikys]
