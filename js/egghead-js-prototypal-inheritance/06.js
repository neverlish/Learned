// 06 Use JavaScript's for-in Loop on Objects with Prototypes

const obj = {
  firstName: 'Tyler',
  lastName: 'Clark'
}

let n = 0

for (let property in obj) {
  n++
}

console.log(n) // 2

const protoObj = {
  hair: 'brown'
}

Object.setPrototypeOf(obj, protoObj)

n = 0

for (let property in obj) {
  n++
}

console.log(n) // 3

n = 0

for (let property in obj) {
  if (obj.hasOwnProperty(property)) {
    n++
  }
}

console.log(n) // 2
