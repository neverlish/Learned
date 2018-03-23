// 06 Create types with Semigroups

// const res = 'a'.concat('b').concat('c')
// const res = [1,2].concat([3,4]).concat([5,6])

// const res = Sum(1).concat(Sum(2)) // Sum(3)

// const res = All(true).concat(All(false)) // All(false)

const { Sum, All, First } = require('./lib');

const res = First('blah').concat(First('ice cream')) // First(blah)

console.log(res)
