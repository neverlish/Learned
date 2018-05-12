// 04 Unwrap Values from a Maybe

const safe = require('crocks/Maybe/safe')
const isNumber = require('crocks/predicates/isNumber')
const compose = require('crocks/helpers/compose')
const { inc, dbl } = require('./utils')

// const incDbl = n => {
  // const incremented = inc(n)
  // return dbl(incremented)
// }

const incDbl = n => safeNum = safe(isNumber, n)
  // .map(inc)
  // .map(dbl)
  .map(compose(dbl, inc))
  .option(0) 

const result = incDbl(2)
console.log(result) // 6

const result2 = incDbl('2')
console.log(result2) // 0
