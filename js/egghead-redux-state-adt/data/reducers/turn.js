import { createAction, createReducer } from '../helpers'

import answer from '../model/answer'
import feedback from '../model/feedback'
import turn from '../model/turn'

const SELECT_CARD = 'SELECT_CARD'
const SHOW_FEEDBACK = 'SHOW_FEEDBACK'
const START_TURN = 'START_TURN'

// selectCard :: String -> Action String
export const selectCard =
  createAction(SELECT_CARD)

// showFeedback :: String -> Action String
export const showFeedback =
  createAction(SHOW_FEEDBACK)

// startTurn :: String -> Action String
export const startTurn =
  createAction(START_TURN)

// reducer :: Reducer
const reducer = createReducer({
  SELECT_CARD: answer,
  SHOW_FEEDBACK: feedback,
  START_TURN: turn,
})

export default reducer
