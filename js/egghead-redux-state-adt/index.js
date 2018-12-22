import log from './logger'

import { nextHint } from './data/model/turn'

const state = {
  cards: [
    { id: 'orange-square', color: 'orange', shape: 'square' },
    { id: 'blue-circle', color: 'blue', selected: true, shape: 'circle' },
    { id: 'green-square', color: 'green', shape: 'square' },
    { id: 'green-triangle', color: 'green', shape: 'triangle' },
  ],
  hint: null,
  seed: Date.now(),
}

log(
  nextHint()
    .execWith(state).hint
)
