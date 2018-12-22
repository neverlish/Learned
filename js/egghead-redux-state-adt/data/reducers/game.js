import { createAction, createReducer } from '../helpers'

import start, {
  markCardsUnselected
} from '../model/game'

import initialize from '../model/initialize'

const START_GAME = 'START_GAME'
const RESET_GAME = 'RESET_GAME'
const HIDE_ALL_CARDS = 'HIDE_ALL_CARDS'

// startGame :: String -> Action String
export const startGame =
  createAction(START_GAME)

// resetGame :: String -> Action String
export const resetGame =
  createAction(RESET_GAME)

// hideAllCards :: String -> Action String
export const hideAllCards =
  createAction(HIDE_ALL_CARDS)

// reducer :: Reducer
const reducer = createReducer({
  START_GAME: start,
  RESET_GAME: initialize,
  HIDE_ALL_CARDS: markCardsUnselected
})

export default reducer
