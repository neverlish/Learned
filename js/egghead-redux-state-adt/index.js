import log from './logger'
import chain from 'crocks/pointfree/chain'

import { drawCardAt, generateCards } from './data/model/game'

const state = {
  colors: ['orange', 'green',' blue', 'yellow'],
  shapes: ['square', 'triangle', 'circle']
}

log(
  generateCards()
    .map(drawCardAt(0))
    .map(chain(drawCardAt(2)))
    .map(chain(drawCardAt(7)))
    .evalWith(state).fst()
)
