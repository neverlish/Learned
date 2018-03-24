// 01 Create linear data flow with container style types (Box)

/*
const nextCharForNumberString = str => {
  const trimmed = str.trim()
  const number = parseInt(trimmed)
  const nextNumber = number + 1
  return String.fromCharCode(nextNumber)
}
*/

const { Box } = require('./lib');

const nextCharForNumberString = str =>
  // String.fromCharCode(parseInt(str.trim()) + 1)
  // [str]
  // .map(s => s.trim())
  // .map(r => parseInt(r))
  // .map(i => i + 1)
  // .map(i => String.fromCharCode(i))
  Box(str)
  .map(s => s.trim())
  .map(r => parseInt(r))
  .map(i => i + 1)
  .map(i => String.fromCharCode(i)) // Box(A)
  .fold(c => c.toLowerCase()) // a
  

const result = nextCharForNumberString('  64 ')
console.log(result)
