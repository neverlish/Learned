import composeK from 'crocks/helpers/composeK'
import map from 'crocks/pointfree/map'
import propEq from 'crocks/predicates/propEq'

import {
  assignBy, clampAfter, dec, inc, over
} from '../helpers'

// limitMoves :: (a -> Number) -> a -> Number
const limitMoves = 
  clampAfter(0, 8)

// markSelected :: String -> Object -> Object
const markSelected = id => {
  return assignBy(propEq('id', id), { selected: true })
}

// decLeft :: () -> State AppState ()
export const decLeft = () => 
  over('left', limitMoves(dec))

// incMoves :: () -> State AppState ()
export const incMoves = () =>
  over('moves', limitMoves(inc))

// applyMove :: () -> State AppState ()
export const applyMove =
  composeK(incMoves, decLeft)

// selectCard :: String -> State AppState ()
export const selectCard = id =>
  over('cards', map(markSelected(id)))

// answer :: String -> State AppState ()
const answer = 
  composeK(applyMove, selectCard)

export default answer
