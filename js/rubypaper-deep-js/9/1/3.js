// 9 자바스크립트 표준 - 1 ECMAScript 6 표준 - 3 클래스(class) 키워드

// class 키워드 활용 예
class Car {
  constructor(name) {
    this.name = name;
    this.type = 'Car';
  }

  getName() {
    return this.name;
  }
}
let car = new Car('My car');
console.log('car.getName(): ' + car.getName());

// class 키워드를 통한 서브 클래스 정의 예
class SUV extends Car {
  constructor(name) {
    super(name);
    this.type = 'SUV';
  }
}

let suv = new SUV('My SUV');
console.log('suv instanceof SUV: ', (suv instanceof SUV)); // true
console.log('suv instanceof Car: ', (suv instanceof Car)); // true
console.log('suv getName(): ', suv.getName());
console.log(SUV);
