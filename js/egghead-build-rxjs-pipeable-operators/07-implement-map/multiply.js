const { map } = require('./map')

const multiply = number => map(value => value * number)

module.exports = { multiply }
