import chain from 'crocks/pointfree/chain'
import compose from 'crocks/helpers/compose'
import composeK from 'crocks/helpers/composeK'
import constant from 'crocks/combinators/constant'
import converge from 'crocks/combinators/converge'
import equals from 'crocks/pointfree/equals'
import find from 'crocks/Maybe/find'
import liftA2 from 'crocks/helpers/liftA2'
import omit from 'crocks/helpers/omit'
import option from 'crocks/pointfree/option'
import propEq from 'crocks/predicates/propEq'

import { clampAfter, getState, liftState, over, decOrInc } from '../helpers'

// Card :: { id: String, color: String, shape: String }
// Hint :: { color: String, shape: String }

// limitRank :: (a -> Number) -> a -> Number
const limitRank =
  clampAfter(0, 4)

// getHint :: () -> State AppState Hint
export const getHint = () =>
  getState('hint')
    .map(option({ color: 'unk', shape: 'unk' }))

// getCard :: String -> State AppState Card
export const getCard = id =>
  getState('cards')
    .map(chain(find(propEq('id', id))))
    .map(option({ id, color: 'unk', shape: 'unk' }))

// setIsCorrect :: Boolean -> State AppState ()
export const setIsCorrect = isCorrect =>
  over('isCorrect', constant(isCorrect))

// cardToHint :: String -> State AppState Hint
const cardToHint = composeK(
  liftState(omit(['id'])), 
  getCard
)

// validateAnswer :: String -> State AppState Boolean
export const validateAnswer = converge(
  liftA2(equals),
  getHint,
  cardToHint
)

// adjustRank :: Boolean -> Number -> Number
const adjustRank =
  compose(limitRank, decOrInc)

// updateRank :: Boolean -> State AppState ()
export const updateRank = isCorrect =>
  over('rank', adjustRank(isCorrect))

const applyFeedback = converge(
  liftA2(constant),
  setIsCorrect,
  updateRank
)

// feedback :: String -> State AppState ()
const feedback =
  composeK(applyFeedback, validateAnswer)

export default feedback
