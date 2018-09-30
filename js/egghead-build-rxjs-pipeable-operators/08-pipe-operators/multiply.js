const { pipe } = require('rxjs')
const { map, filter } = require('rxjs/operators')

// const pipe = (...fns) => source => 
//   fns.reduce((acc, fn) => fn(acc), source)

const multiply = number => 
  pipe(
    map(value => value * number),
    filter(value => value < 10)
  )

module.exports = { multiply }
