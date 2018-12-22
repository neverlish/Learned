import { createAction, createReducer } from '../helpers'

import answer from '../model/answer'
import feedback from '../model/feedback'

const SELECT_CARD = 'SELECT_CARD'
const SHOW_FEEDBACK = 'SHOW_FEEDBACK'

// selectCard :: String -> Action String
export const selectCard =
  createAction(SELECT_CARD)

// showFeedback :: String -> Action String
export const showFeedback =
  createAction(SHOW_FEEDBACK)

// reducer :: Reducer
const reducer = createReducer({
  SELECT_CARD: answer,
  SHOW_FEEDBACK: feedback
})

export default reducer
