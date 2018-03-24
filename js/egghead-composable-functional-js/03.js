// 03 Enforce a null check with composable code branching using Either

const { Right, Left, fromNullable } = require('./lib');

/*
const findColor = name => {
  const found = ({red: '#ff4444', blue: '#eb5998', yellow: '#fff68f'})[name]
  return found ? Right(found) : Left(null)
}
*/
const findColor = name =>
  fromNullable(({red: '#ff4444', blue: '#eb5998', yellow: '#fff68f'})[name])

const result = Right(3).map(x => x + 1).map(x => x / 2).fold(x => 'error', x => x)
console.log(result)

const result2 = findColor('blue')
                .map(c => c.slice(1))
                .fold(e => 'no color', c => c.toUpperCase())
console.log(result2) // EB5998

const result3 = findColor('green')
                .map(c => c.slice(1))
                .fold(e => 'no color', c => c.toUpperCase())
console.log(result3) // no color
