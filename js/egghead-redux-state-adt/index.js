import log from './logger'

import { applyMove } from './data/model/answer'

const state = {
  left: 8,
  moves: 0,
}

log(
  applyMove()
    .chain(applyMove)
    .chain(applyMove)
    .execWith(state)
)
