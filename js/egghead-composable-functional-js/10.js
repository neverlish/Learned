// 10 Unbox types with foldMap

const { Map, List } = require('immutable-ext')
const { Sum } = require('./lib');

const res = List.of(Sum(1), Sum(2), Sum(3))
            .fold(Sum.empty()) // Sum(6)
            // .reduce((acc, x) => acc.concat(x), Sum.empty())

const res2 = Map({brian: Sum(3), sara: Sum(5)})
             .fold(Sum.empty()) // Sum(8)

const res3 = List.of(1,2,3)
             .map(Sum)
             .fold(Sum.empty()) // Sum(6)

console.log(res, res2, res3)
