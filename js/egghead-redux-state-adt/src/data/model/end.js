import composeK from 'crocks/helpers/composeK'
import constant from 'crocks/combinators/constant'
import converge from 'crocks/combinators/converge'
import liftA2 from 'crocks/helpers/liftA2'
import option from 'crocks/pointfree/option'

import { getState, over } from '../helpers'

// setHasWon :: (Boolean | Null) -> State AppState ()
const setHasWon = hasWon =>
  over('hasWon', constant(hasWon))

// getLeft :: () -> State AppState Integer
const getLeft = () =>
  getState('left')
    .map(option(8))

// getRank :: () -> State AppState Integer
const getRank = () =>
  getState('rank')
    .map(option(4))

// determine :: Integer -> Integer -> (Boolean | Null)
const determine = left => rank =>
  rank > 0
    ? rank > left ? false : null
    : true

// checkWon :: () -> State AppState (Boolean | Null)
const checkWon = converge(
  liftA2(determine),
  getLeft,
  getRank
)

// endGame :: () -> State AppState ()
const endGame =
  composeK(setHasWon, checkWon)

export default endGame
