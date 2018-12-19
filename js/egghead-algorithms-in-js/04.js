// Create a Selection Sort Function in JavaScript

const itemsToSort = [3, 2, 4, 1, 6]

function findLargestValue(list) {
  let lrg = list[0]
  let indexOfLarge = 0
  for (let i = 1; i <= list.length; i++) {
    if (lrg < list[i]) {
      lrg = list[i]
      indexOfLarge = i
    }
  }
  return indexOfLarge
}

function selectionSort(list) {
  let newList = []
  let lrgItem
  while (list.length) {
    lrgItem = findLargestValue(list)
    newList.push(list[lrgItem])
    list.splice(lrgItem, 1)
  }
  return newList
}

console.log(selectionSort(itemsToSort)) // [ 6, 4, 3, 2, 1 ]
