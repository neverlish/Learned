import log from './logger'

import { incMoves } from './data/model/answer'

const state = {
  left: 8,
  moves: 0,
}

log(
  incMoves()
    .chain(incMoves)
    .execWith(state)
)
