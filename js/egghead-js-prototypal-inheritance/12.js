// 12 Use Polymorphism with Prototype Linked Objects

const foo = {
  // name: 'tyler'
}

Object.defineProperty(foo, 'name', {
  value: 'tyler',
  writable: false
})

const bar = {
  lastName: 'clark'
}

Object.setPrototypeOf(bar, foo)

bar.name = 'james'
console.log(bar.name) // tyler

const foo2 = {
  set name(name) {
    this.currentName = name
  }
}

const bar2 = {
  lastName: 'clark'
}

Object.setPrototypeOf(bar2, foo2)

bar2.name = 'james'

console.log(bar2.name) // undefined
console.log(bar2) // { lastName: 'clark', currentName: 'james' }
