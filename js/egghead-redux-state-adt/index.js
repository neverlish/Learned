import log from './logger'

import { pickCards } from './data/model/game'

const state = {
  colors: ['orange', 'green',' blue', 'yellow'],
  shapes: ['square', 'triangle', 'circle'],
  cards: null,
  seed: Date.now()
}

log(
  pickCards()
    .execWith(state).cards
)
