// 11 Apply a function in a Maybe context to Maybe inputs

const crocks = require('crocks')
const { Maybe, isNumber, safe, liftA2 } = crocks

const safeNum1 = safe(isNumber, 1)
const safeNum2 = safe(isNumber, 2)

const add = a => b  => a + b

const safeAdd = Maybe.of(add)

safeAdd
  .ap(safeNum1)
  .ap(safeNum2) // Just 3

safeNum1.map(add)
  // .chain(fn => safeNum2.map(fn))
  .ap(safeNum2) // Just 3

const safeAdd2 = liftA2(add)
safeAdd2(safeNum1, safeNum2) // Just 3
