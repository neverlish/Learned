// 08 Ensure failsafe combination using monoids

// const res = Sum.empty().concat(Sum(1).concat(Sum(2))) // Sum(3)

// const res = All(true).concat(All(true)).concat(All.empty()) // All(true)

const { Sum, All } = require('./lib');

const sum = xs =>
  xs.reduce((acc, x) => acc + x, 0)

const all = xs =>
  xs.reduce((acc, x) => acc && x, true)

const first = xs =>
  xs.reduce((acc, x) => acc)

console.log(first([1,2]))
