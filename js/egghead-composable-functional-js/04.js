// 04 Use chain for composable error handling with nested Eithers

const { tryCatch } = require('./lib');

const fs = require('fs')

/*
const getPort = () => {
  try {
    const str = fs.readFileSync('config.json')
    const config = JSON.parse(str)
    return config.port
  } catch (e) {
    return 3000
  }
}
*/
const getPort = () =>
  tryCatch(() => fs.readFileSync('./config.json'))
  .chain(c => tryCatch(() => JSON.parse(c)))
  .fold(e => 3000,
        c => c.port)

const result = getPort()
console.log(result)
