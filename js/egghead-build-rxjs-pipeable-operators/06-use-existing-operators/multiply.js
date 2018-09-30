const { map } = require('rxjs/operators')

const multiply = number => map(value => value * number)

module.exports = { multiply }
