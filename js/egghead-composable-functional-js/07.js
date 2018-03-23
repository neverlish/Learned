// 07 Semigroup examples

const { Map } = require('immutable-ext')
const { Sum, All, First } = require('./lib');

const acct1 = Map({ name: First('Nico'), isPaid: All(true), points: Sum(10), friends: ['Franklin']})
const acct2 = Map({ name: First('Nico'), isPaid: All(false), points: Sum(2), friends: ['Gatsby']})

const res = acct1.concat(acct2)

console.log(res.toJS())
/*
{ name: First(Nico),
  isPaid: All(false),
  points: Sum(12),
  friends: [ 'Franklin', 'Gatsby' ] }
*/
