// Classify Mystery Items with the K-Nearest Neighbors Algorithm in JavaScript

function determineFruit({ size, redness }) {
  const fruit = [
    { name: "grape", size: 1, redness: 0 },
    { name: "orange", size: 2, redness: 1 },
    { name: "grapefruit", size: 3, redness: 2 }
  ]

  const { name } = fruit.reduce((prev, cur) => {
    let curCalc = calcDistance([[size, cur.size], [redness, cur.redness]])
    return prev.dist < curCalc
      ? prev
      : { name: cur.name, dist: curCalc }
  }, {
    name: fruit[0].name,
    dist: calcDistance([[size, fruit[0].size], [redness, fruit[0].redness]])
  })

  return `This is most likely a ${name}`
}

function calcDistance(data) {
  return Math.floor(data.reduce((acc, [init, test]) => acc + Math.pow((init - test), 2), 0))
}

console.log(determineFruit({ size: 1, redness: 0 })) // This is most likely a grape
