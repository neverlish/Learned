function logger() {
  console.log('Start')
  console.log('End')
}

logger()
// Start
// End

function* createLogger() {
  console.log('Start')
  console.log('End')
}

const logger2 = createLogger()
logger2.next()
// Start
// End

function* createLogger2() {
  console.log('Start')
  yield
  console.log('End')
}

const logger3 = createLogger2()
logger3.next()
// Start

logger3.next()
// End

function* createLogger3() {
  console.log('Start')
  yield
  console.log('Second block')
  yield
  console.log('Third block')
  yield
  console.log('End')
}

const logger4 = createLogger3()
logger4.next()
// Start

logger4.next()
// Second block

logger4.next()
// Third block

logger4.next()
// End
