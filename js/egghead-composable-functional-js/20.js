// 20 List comprehensions with Applicative Functors

const { List } = require('immutable-ext');

const merch = () => 
  List.of(x => y => z => `${x}-${y}-${z}`)
  .ap(List(['teeshirt', 'sweater']))
  .ap(List(['large', 'medium', 'small']))
  .ap(List(['black', 'white']))

const res = merch()
console.log(res)
/*
List [ "teeshirt-large-black", "teeshirt-large-white", "teeshirt-medium-black", "teeshirt-medium-white", "teeshirt-small-black", "teeshirt-small-white", "sweater-large-black", "sweater-large-white", "sweater-medium-black", "sweater-medium-white", "sweater-small-black", "sweater-small-white" ]
*/
