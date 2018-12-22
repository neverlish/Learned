import { createAction } from '../helpers'

import answer from '../model/answer'

const SELECT_CARD = 'SELECT_CARD'

// selectCard :: String -> Action String
export const selectCard =
  createAction(SELECT_CARD)

// reducer :: Action a -> State AppState ()
const reducer = ({ type, payload }) => {
  switch (type) {
    case SELECT_CARD:
      return answer(payload)
  }

  return null
}

export default reducer
