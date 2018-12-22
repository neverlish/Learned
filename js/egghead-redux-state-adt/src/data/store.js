import { createStore, compose } from 'redux'

import identity from 'crocks/combinators/identity'

import { initialState } from './model/initialize'

import reducer from './reducers'

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  reducer,
  initialState(),
  composeEnhancers(identity)
)
