// Sort a Array with a QuickSort Function in JavaScript

function quickSort(array) {
  if (array.length < 2) return array
  let pivotIndex = Math.floor(array.length / 2)
  let pivot = array[pivotIndex]
  let less = []
  let greater = []
  for (let i in array) {
    if (i != pivotIndex) {
      array[i] > pivot ? greater.push(array[i]) : less.push(array[i])
    }
  }

  return [
    ...quickSort(less),
    pivot,
    ...quickSort(greater)
  ]
}

console.log(quickSort([3, 4, 6, 1, 2, 5])) // [ 1, 2, 3, 4, 5, 6 ]
