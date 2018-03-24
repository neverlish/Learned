// 14 You've been using Functors

const Task = require('data.task');
const { Box, Right, Left, fromNullable } = require('./lib');
const { List, Map } = require('immutable-ext');

// fx.map(f).map(g) === fx.map(x => g(f(x)))

const res1 = Box('squirrels')
            .map(s => s.substr(5))
            .map(s => s.toUpperCase())

const res2 = Box('squirrels')
            .map(s => s.substr(5).toUpperCase())

console.log(res1, res2)

// fx.map(id) === id(fx)

const id = x => x
const res3 = List.of('crayons').map(id)
const res4 = id(List.of('crayons'))

console.log(res3, res4)
