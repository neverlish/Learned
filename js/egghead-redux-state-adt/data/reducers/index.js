
import State from 'crocks/State'

import execWith from 'crocks/State/execWith'
import isSameType from 'crocks/predicates/isSameType'
import safe from 'crocks/Maybe/safe'

import turn from './turn'

// reducer :: (AppState, Action a) -> AppState
const reducer = (prev, action) =>
  turn(action)
    .chain(safe(isSameType(State)))
    .map(execWith(prev))
    .option(prev)

export default reducer
