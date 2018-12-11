const { createQueue } = require('./queues')

function createNode(key) {
  const neighbors = []

  return {
    key,
    neighbors,
    addNeighbor(node) {
      neighbors.push(node)
    }
  }
}

function createGraph(directed = false) {
  const nodes = []
  const edges = []

  return {
    directed,
    nodes,
    edges,

    addNode(key) {
      nodes.push(createNode(key))
    },

    getNode(key) {
      return nodes.find(node => node.key === key)
    },

    addEdge(node1key, node2key) {
      const node1 = this.getNode(node1key)
      const node2 = this.getNode(node2key)

      node1.addNeighbor(node2)
      edges.push(`${node1key}-${node2key}`)

      if (!directed) {
        node2.addNeighbor(node1)
      }
    },

    print() {
      return nodes.map(({ key, neighbors }) => {
        let result = key

        if (neighbors.length) {
          result += ` => ${neighbors.map(neighbor => neighbor.key).join(' ')}`
        }

        return result
      })
      .join('\n')
    },

    breadFirstSearch(startingNodeKey, visitFn) {
      const startingNode = this.getNode(startingNodeKey)
      const visited = nodes.reduce((acc, node) => {
        acc[node.key] = false
        return acc
      }, {})

      const queue = createQueue()
      queue.enqueue(startingNode)

      while (!queue.isEmpty()) {
        const currentNode = queue.dequeue()

        if (!visited[currentNode.key]) {
          visitFn(currentNode)
          visited[currentNode.key] = true
        }

        currentNode.neighbors.forEach(node => {
          if (!visited[node.key]) {
            queue.enqueue(node)
          }
        })
      }
    }
  }
}

// const graph = createGraph(true)
// graph.addNode('Kyle')
// graph.addNode('Anna')
// graph.addNode('Krios')
// graph.addNode('Tali')

// graph.addEdge('Kyle', 'Anna')
// graph.addEdge('Anna', 'Kyle')
// graph.addEdge('Kyle', 'Krios')
// graph.addEdge('Kyle', 'Tali')
// graph.addEdge('Anna', 'Krios')
// graph.addEdge('Anna', 'Tali')
// graph.addEdge('Krios', 'Anna')
// graph.addEdge('Tali', 'Kyle')

// console.log(graph.print())

const graph = createGraph(true)
const nodes = ['a', 'b', 'c', 'd', 'e', 'f']
const edges = [
  ['a', 'b'],
  ['a', 'e'],
  ['a', 'f'],
  ['b', 'd'],
  ['b', 'e'],
  ['c', 'b'],
  ['d', 'c'],
  ['d', 'e']
]

nodes.forEach(node => {
  graph.addNode(node)
})

edges.forEach(nodes => {
  graph.addEdge(...nodes)
})

graph.breadFirstSearch('a', node => {
  console.log(node.key)
})
/*
a
b
e
f
d
c
*/
