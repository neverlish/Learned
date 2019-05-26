// 09 Improve JavaScript Function Usability with Proper Argument Order in Functional Programming

// Argument Order

const map = array => cb => array.map(cb)

const arr = [1, 2, 3, 4, 5]
const double = n => n * 2

const withArr = map(arr)

console.log(withArr(double)) // [ 2, 4, 6, 8, 10 ]
console.log(withArr(n => n * 3)) // [3, 6, 9, 12, 15]
console.log(arr.map(n => n * 4)) // [4, 8, 12, 16, 20]

const map2 = cb => array => array.map(cb)
const withDouble = map2(double)

console.log(withDouble(arr)) // [ 2, 4, 6, 8, 10 ]
console.log(withDouble([2, 4, 6, 8, 10])) // [4, 8, 12, 16, 20]

// Most specific => least specific
const prop = key => obj => obj[key]

const propName = prop('name')
const people = [
  { name: 'Jamon' },
  { name: 'Shirley' },
  { name: 'Kent' },
  { name: 'Sarah' },
  { name: 'Ken' },
]

console.log(map2(propName)(people)) // [ 'Jamon', 'Shirley', 'Kent', 'Sarah', 'Ken' ]