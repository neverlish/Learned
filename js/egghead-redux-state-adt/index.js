import log from './logger'

import { getHint, getCard } from './data/model/feedback'

const state = {
  cards: [
    { id: 'green-square', color: 'green', shape: 'square' },
    { id: 'orange-square', color: 'orange', shape: 'square' },
    { id: 'blue-triangle', color: 'blue', shape: 'triangle' },
  ],
  hint: {
    color: 'green',
    shape: 'square'
  },
}

log(
  getCard('green-square')
    .evalWith(state)
)
