// 10 Determine an Object's Constructor with JavaScripts instanceof Operator

function Car(make) {
  this.make = make
}

function Boat(engine) {
  this.engine = engine
}

Object.setPrototypeOf(Boat.prototype, Car.prototype)

const myCar = new Car('Ford')
console.log(myCar instanceof Car) // true

const myCar2 = new Boat('Ford')
console.log(myCar2 instanceof Car) // true
