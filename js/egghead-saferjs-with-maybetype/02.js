// 02 Understand the Maybe Data Type

const { inc } = require('./utils')
const Maybe = require('crocks/Maybe')

// Maybe = Just x | Nothing

// const input = undefined
// const result = typeof input === 'number' ? inc(input) : 0 
const input = Maybe.Just(2)
const result = input.map(n => console.log('calling inc') || inc(n))

console.log(result) // calling inc / Just 3

const input2 = Maybe.Nothing()
const result2 = input2.map(n => console.log('calling inc') || inc(n))
console.log(result2) // Nothing

////////

const safeNum = val => 
  typeof val === 'number' ? Maybe.Just(val) : Maybe.Nothing()

const input3 = safeNum(2)
const result3 = input3.map(n => console.log('calling inc') || inc(n))
console.log(result3) // calling inc / Just 3

const input4 = safeNum({})
const result4 = input4.map(n => console.log('calling inc') || inc(n))
console.log(result4) // Nothing

