
import State from 'crocks/State'
import isSameType from 'crocks/predicates/isSameType'

import turn from './turn'

// reducer :: (AppState, Action a) -> AppState
const reducer = (prev, action) => {
  const result = turn(action)

  return isSameType(State, result)
    ? result.execWith(prev)
    : prev
}

export default reducer
