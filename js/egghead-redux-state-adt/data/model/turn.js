import converge from 'crocks/combinators/converge'
import composeK from 'crocks/helpers/composeK'
import constant from 'crocks/combinators/constant'
import filter from 'crocks/pointfree/filter'
import identity from 'crocks/combinators/identity'
import liftA2 from 'crocks/helpers/liftA2'
import pick from 'crocks/helpers/pick'
import option from 'crocks/pointfree/option'

import { getAt, liftState, over, selectState } from '../helpers'
import { randomIndex } from './random'

// notSelected :: Card -> Boolean
const notSelected =
  ({ selected }) => !selected

// toHint :: Object -> Hint
const toHint =
  pick([ 'color', 'shape' ])

// getUnselectedCards :: () -> State AppState [ Card ]
export const getUnselectedCards = () =>
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

// nextHint :: () -> State AppState Card
export const nextHint = composeK(
  setHint,
  pickCard,
  getUnselectedCards
)
