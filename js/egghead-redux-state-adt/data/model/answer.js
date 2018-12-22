import composeK from 'crocks/helpers/composeK'

import {
  clampAfter, dec, inc, over
} from '../helpers'

// limitMoves :: (a -> Number) -> a -> Number
const limitMoves = 
  clampAfter(0, 8)

// decLeft :: () -> State AppState ()
export const decLeft = () => 
  over('left', limitMoves(dec))

// incMoves :: () -> State AppState ()
export const incMoves = () =>
  over('moves', limitMoves(inc))

// applyMove :: () -> State AppState ()
export const applyMove =
  composeK(incMoves, decLeft)
