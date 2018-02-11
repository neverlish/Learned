// 4 프로토타입과 객체지향, 그리고 상속 - 2 자바스크립트에서의 상속 활용 - 7 class와 extends를 통한 상속

// Class와 extends를 이용한 상속 구현 예
class Person {
  constructor() {
    this.name = 'anonymous';
  }
}
class Unikys extends Person {
  constructor() {
    super();
    this.name = 'Unikys';
  }
}

var unikys = new Unikys();
console.log(unikys instanceof Unikys); // true
console.log(unikys instanceof Person); // true
console.log(unikys.constructor); // [Function: Unikys]
