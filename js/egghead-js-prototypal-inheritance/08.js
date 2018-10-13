// 08 Understanding Prototype Delegation within JavaScript's Class Keyword

class Vehicle {
  isLegal() {
    return true
  }
}

console.log(typeof Vehicle) // function
console.log(typeof Vehicle.prototype) // object

class Car extends Vehicle {
  canBeUsed() {
    return this.isLegal()
  }
}

console.log(new Car().canBeUsed()) // true

const myCar = new Car()

console.log(Object.getPrototypeOf(myCar) === Car.prototype) // true

console.log(Object.getPrototypeOf(Car.prototype) === Vehicle.prototype) // true

