import converge from 'crocks/combinators/converge'
import composeK from 'crocks/helpers/composeK'
import constant from 'crocks/combinators/constant'
import filter from 'crocks/pointfree/filter'
import identity from 'crocks/combinators/identity'
import liftA2 from 'crocks/helpers/liftA2'
import option from 'crocks/pointfree/option'

import {
  getAt, liftState, over,
  selectState, toHint
} from '../helpers'

import { randomIndex } from './random'
import endGame from './end'

// notSelected :: Card -> Boolean
const notSelected =
  ({ selected }) => !selected

// getUnselectedCards :: () -> State AppState [ Card ]
const getUnselectedCards = () =>
  selectState('cards', filter(notSelected))
    .map(option([]))

// pickCard :: [ Card ] -> State AppState Card
const pickCard = converge(
  liftA2(getAt),
  randomIndex,
  liftState(identity)
)

// setHint :: Card -> State AppState ()
const setHint = card =>
  over('hint', constant(toHint(card)))

// nextHint :: () -> State AppState ()
export const nextHint = composeK(
  setHint,
  pickCard,
  getUnselectedCards
)

// resetIsCorrect :: () -> State AppState ()
const resetIsCorrect = () =>
  over('isCorrect', constant(null))

// turn :: () -> State AppState ()
const turn =
  composeK(resetIsCorrect, nextHint, endGame)

export default turn
