// 03 Create a Maybe with a `safe` Utility Function

const { inc, toUpper } = require('./utils')
const Maybe = require('crocks/Maybe')
const safe = require('crocks/Maybe/safe')
const isNumber = require('crocks/predicates/isNumber')
const isString = require('crocks/predicates/isString')

// const isNumber = val => typeof val === 'number'
// const isString = val => typeof val === 'string'

// const safe = (pred, val) =>
//   pred(val) ? Maybe.Just(val) : Maybe.Nothing()

// const safeNum = val => 
//   typeof val === 'number' ? Maybe.Just(val) : Maybe.Nothing()
const safeNum = safe(isNumber)

// const safeString = val =>
//   typeof val === 'string' ? Maybe.Just(val) : Maybe.Nothing()

// const inputN = safe(isNumber, 5)
const inputN = safeNum(5)
const resultN = inputN.map(inc)
console.log(resultN) // Just 6

// const inputS = 7 // s.toUpperCase is not a function
// const resultS = toUpper(inputS)
// const inputS = safeString('test')
const inputS = safe(isString, 'test')
const resultS = inputS.map(toUpper)
console.log(resultS) // Just "TEST"
