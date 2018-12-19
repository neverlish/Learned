// Refactor a Linear Search into a Binary Search with JavaScript

const items = [1, 5, 2, 7, 3, 12, 6, 10]

items.sort((a, b) => a - b)

function search(list, item) {
  // let hasItem = null
  // let counter = 0

  // for (let e of list) {
  //   counter++
  //   if (e === item) {
  //     hasItem = true
  //     break
  //   }
  // }

  let low = 0
  let high = list.length
  let counter = 0

  while (low < high) {
    counter++
    let mid = Math.floor((low + high) / 2)
    let guess = list[mid]
    if (guess === item) return true
    if (guess > item) high = mid - 1
    else low = mid + 1
  }
  console.log(counter)
  return null
}

console.log(search(items, 12))
