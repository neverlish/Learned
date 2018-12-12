const { printArray } = require('./utils')

function quickSort(array) {
  printArray(array)
  
  if (array.length < 2) {
    return array
  }
  
  const pivotIndex = array.length - 1
  const pivot = array[pivotIndex]
  const left = []
  const right = []
  
  for (let i = 0; i < pivotIndex; i++) {
    const currentItem = array[i]
    currentItem < pivot
    ? left.push(currentItem)
    : right.push(currentItem)
  }
  
  const result = [
    ...quickSort(left),
    pivot,
    ...quickSort(right)
  ]
  
  printArray(array)

  return result
}

const numbers = [10, 6, 3, 2, 7, 9, 1, 8, 5, 4]
quickSort(numbers)
