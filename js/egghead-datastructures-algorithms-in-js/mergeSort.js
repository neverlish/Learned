function mergeSort(array) {
  if (array.length < 2) {
    return array
  }

  const middle = Math.floor(array.length / 2)
  const left = array.slice(0, middle)
  const right = array.slice(middle)

  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  const sorted = []

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      sorted.push(left.shift())
    } else {
      sorted.push(right.shift())
    }
  }

  const results = [...sorted, ...left, ...right]

  console.log(results)

  return results
}

const numbers = [10, 5, 4, 7, 8, 2, 1, 3, 9, 6]

mergeSort(numbers)
/*
[ 5, 10 ]
[ 7, 8 ]
[ 4, 7, 8 ]
[ 4, 5, 7, 8, 10 ]
[ 1, 2 ]
[ 6, 9 ]
[ 3, 6, 9 ]
[ 1, 2, 3, 6, 9 ]
[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
*/
