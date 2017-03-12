function* createCounter() {
  yield 1
  yield 2
  yield 3
  yield 4
}

const counter = createCounter()
console.log(counter.next())
// { value: 1, done: false }

console.log(counter.next())
// { value: 2, done: false }

console.log(counter.next())
// { value: 3, done: false }

console.log(counter.next())
// { value: 4, done: false }

console.log(counter.next())
// { value: undefined, done: true }

function* createCounter2() {
  yield 1
  yield 2
  yield 3
  yield 4
}

const counter2 = createCounter2()
for (let i of counter2) {
  console.log(i)
  // 1
  // 2
  // 3
  // 4
}
