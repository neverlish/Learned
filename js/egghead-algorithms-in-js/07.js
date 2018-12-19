// Solve Complex Problems in JavaScript with Dynamic Programming

const rope = { value: 1500, weight: 1 }
const food = { value: 2000, weight: 3 }
const tent = { value: 3000, weight: 4 }
const iphone = { value: 2000, weight: 1}

const constraint = [1, 2, 3, 4]
const items = [rope, tent, food, iphone]

function createGrid() {
  let newGrid = []
  for (let row = 0; row < items.length; row++) {
    newGrid[row] = []
    for (let col = 0; col < constraint.length; col++) {
      newGrid[row][col] = 0
    }
  }
  return newGrid
}

function fillInGrid(grid) {
  for (let row in items) {
    for (let col in constraint) {
      let { value, weight } = items[row]
      if (grid[row - 1] === undefined) {
        grid[row][col] = value
        continue
      }
      let prevRowSameCol = grid[row - 1][col]
      if (weight > constraint[col]) {
        grid[row][col] = prevRowSameCol
        continue
      }
      if (weight === constraint[col]) {
        grid[row][col] = prevRowSameCol > value ? prevRowSameCol : value
        continue
      }
      let diff = constraint[col - 1] - weight
      grid[row][col] = prevRowSameCol > value + grid[row - 1][diff] ? prevRowSameCol : value + grid[row - 1][diff]
    }
  }
  return grid
}

const matrix = createGrid()
console.log(matrix) // [ [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ]
console.log(fillInGrid(matrix))
/*
[ [ 1500, 1500, 1500, 1500 ],
  [ 1500, 1500, 1500, 3000 ],
  [ 1500, 1500, 2000, 3500 ],
  [ 2000, 3500, 3500, 4000 ] ]
*/
