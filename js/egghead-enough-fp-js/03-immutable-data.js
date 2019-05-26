// 03 Avoiding Mutations in JavaScript with Immutable Data Structures

// Immutable Data

// Mutable = can be changed after creation
// Immutable = can't be changed after creation

const a = [1, 2, 3]
const b = a
console.log(a === b) // true
b.push(4)
console.log(a) // [ 1, 2, 3, 4 ]

const a2 = { foo: 'bar' }
const b2 = a2
b2.foo = 'baz'
console.log(a2.foo) // baz

const push = value => array => {
  const clone = [...array]
  clone.push(value)
  return clone
}

const a3 = [1, 2, 3]
const b3 = push(4)(a3)
console.log(a3) // [ 1, 2, 3 ]
console.log(a3 === b3) // false

class MutableGlass {
  constructor(content, amount) {
    this.content = content
    this.amount = amount
  }

  takeDrink(value) {
    this.amount = Math.max(this.amount - value, 0)
    return this
  }
}

const mg1 = new MutableGlass('water', 100)
const mg2 = mg1.takeDrink(20)
console.log(mg1 === mg2) // true
console.log(mg1.amount === mg2.amount) // true

class ImmutableGlass {
  constructor(content, amount) {
    this.content = content
    this.amount = amount
  }

  takeDrink(value) {
    return new ImmutableGlass(this.content, Math.max(this.amount - value, 0))
  }
}

const ig1 = new ImmutableGlass('water', 100)
const ig2 = ig1.takeDrink(20)
console.log(ig1 === ig2) // false
console.log(ig1.amount === ig2.amount) // false