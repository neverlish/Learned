import { createAction, createReducer } from '../helpers'

import start, {
  markCardsUnselected
} from '../model/game'

const START_GAME = 'START_GAME'
const HIDE_ALL_CARDS = 'HIDE_ALL_CARDS'

// startGame :: String -> Action String
export const startGame =
  createAction(START_GAME)

// hideAllCards :: String -> Action String
export const hideAllCards =
  createAction(HIDE_ALL_CARDS)

// reducer :: Reducer
const reducer = createReducer({
  START_GAME: start,
  HIDE_ALL_CARDS: markCardsUnselected
})

export default reducer
