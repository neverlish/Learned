function* createHello() {
  yield 'first'
}

const hello = createHello()
console.log(hello.next())
// { value: 'first', done: false }

console.log(hello.next())
// { value: undefined, done: true }

function* createHello2() {
  const word = yield
  console.log(word)
}

const hello2 = createHello2()
console.log(hello2.next())
// { value: undefined, done: false }

console.log(hello2.next('Max'))
// Max
// { value: undefined, done: true }
