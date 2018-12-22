import State from 'crocks/State'

import { selectCard } from './data/model/answer'
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
  // selectCard('green-square')
  State.of('green-square')
    .chain(selectCard)
    .execWith(state)
)
