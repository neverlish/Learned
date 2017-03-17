function* createHello() {
  const word = yield
  console.log(`Hello ${word}`)
}

const hello = createHello()
hello.next()
hello.next('Max')
// Hello Max

function* createHello2() {
  try {
    const word = yield
    console.log(`Hello ${word}`)
  } catch (err) {
    console.log('ERROR', err)
  }
}

const hello2 = createHello2()
hello2.next()
hello2.throw('Something went wrong.')
// ERROR Something went wrong.
