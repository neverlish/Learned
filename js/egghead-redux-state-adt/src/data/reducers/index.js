
import State from 'crocks/State'

import execWith from 'crocks/State/execWith'
import isSameType from 'crocks/predicates/isSameType'
import safe from 'crocks/Maybe/safe'

import turn from './turn'
import game from './game'

import { combineReducers } from '../helpers'

// reducers :: Reducer
const reducers = 
  combineReducers([ game,  turn ])

// reducer :: (AppState, Action a) -> AppState
const reducer = (prev, action) =>
  reducers(action)
    .chain(safe(isSameType(State)))
    .map(execWith(prev))
    .option(prev)

export default reducer
