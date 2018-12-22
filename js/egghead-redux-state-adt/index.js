import answer from './data/model/answer'
import log from './logger'

const state = {
  cards: [
    { id: 'green-square', color: 'green', shape: 'square' },
    { id: 'orange-square', color: 'orange', shape: 'square' },
    { id: 'blue-triangle', color: 'blue', shape: 'triangle' },
  ],
  left: 8,
  moves: 0,
}

log(
  answer('green-square')
    .execWith(state)
)
