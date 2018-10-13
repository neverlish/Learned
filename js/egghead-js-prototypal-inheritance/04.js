// 04 Understanding the .constructor property on JavaScript Objects

function Foo() {

}

Foo.prototype = {}

Object.defineProperty(Foo.prototype, 'constructor', {
  enumerable: false,
  writable: true,
  configurable: true,
  value: Foo
});

console.log(Foo.prototype.constructor) // [Function: Foo]

const a = new Foo()

console.log(a.constructor === Foo) // true
console.log(a.constructor === Object) // false
