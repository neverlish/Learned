// 03 Prototype Delegation with JavaScript's new Keyword

function Car(make) {
  this.make = make
  this.wheels = 1
}

Car.wheels = 5

Car.prototype.color = 'black'
Car.prototype.wheels = 4

console.log(Car.prototype) // Car { color: 'black', wheels: 4 }

const myCar = new Car('Ford')

console.log(myCar) // Car { make: 'Ford', wheels: 1 }
console.log(myCar.color) // black
console.log(myCar.wheels) // 1

console.log([]) // []
console.log({}) // {}

const obj = new Object()
const arr = new Array()

console.log(obj) // {}
console.log(arr) // []
