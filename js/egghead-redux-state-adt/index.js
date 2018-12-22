import log from './logger'

import constant from 'crocks/combinators/constant'
import liftA2 from 'crocks/helpers/liftA2'

import initialize from './data/model/initialize'

import startGame, {
  markCardsUnselected
} from './data/model/game'

import { nextHint } from './data/model/turn'
import answer from './data/model/answer'
import feedback from './data/model/feedback'

const start =
  initialize()
    .chain(startGame)
    .chain(markCardsUnselected)
    .chain(nextHint)

const select =
  answer('blue-square')
    .chain(constant(feedback('blue-square')))

log(
  liftA2(constant, start, select)
    .execWith(null)
)
