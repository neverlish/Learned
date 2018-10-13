// 05 Understand JavaScripts this keyword within Prototypes

'use strict'

function Foo(name) {
  this.name = name
}

Foo.prototype.myName = function() {
  return this.name
}

function Bar(name) {
  Foo(name)
}

// const a = new Bar('tyler') // Cannot set property 'name' of undefined

// console.log(a.myName()) // a.myName is not a function

Bar.prototype = Object.create(Foo.prototype)

// const a2 = new Bar('tyler') //
// console.log(a2.myName()) // undefined

function Bar2(name) {
  Foo.call(this, name)
}

const a3 = new Bar2('tyler')
// console.log(a3.myName()) // a3.myName is not a function

Bar2.prototype = Object.create(Foo.prototype)

const a4 = new Bar2('tyler') // tyler
console.log(a4.myName())
