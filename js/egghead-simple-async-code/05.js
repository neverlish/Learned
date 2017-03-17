function* create3ToCounter() {
  yield 3
  yield 4
}

function* createCounter() {
  yield 1
  yield 2
  yield* create3ToCounter()
  yield 5
}

for (let i of createCounter()) {
  console.log(i)
  // 1
  // 2
  // 3
  // 4
  // 5
}

function* create3ToCounter2() {
  yield 3
  return 4
}

function* createCounter2() {
  yield 1
  yield 2
  const four = yield* create3ToCounter2()
  console.log(four)
  yield 5
}

for (let i of createCounter2()) {
  console.log(i)
  // 1
  // 2
  // 3
  // 4
  // 5
}
