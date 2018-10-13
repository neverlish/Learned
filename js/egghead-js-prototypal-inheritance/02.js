// 02 Link to Other Objects through the JavaScript Prototype Chain

const obj = {
  firstName: 'Tyler'
}

console.log(obj.toString()) // [object Object]

const protoObj = {
  lastName: 'Clark'
}

Object.setPrototypeOf(obj, protoObj)

console.log(obj.lastName) // Clark
