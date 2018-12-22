import log from './logger'

import { drawRandom, getDeck } from './data/model/game'

const state = {
  colors: ['orange', 'green',' blue', 'yellow'],
  shapes: ['square', 'triangle', 'circle'],
  seed: Date.now()
}

log(
  getDeck()
    .chain(drawRandom)
    .chain(drawRandom)
    .chain(drawRandom)
    .chain(drawRandom)
    .chain(drawRandom)
    .evalWith(state).fst()
)
