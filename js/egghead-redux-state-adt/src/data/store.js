import { applyMiddleware, createStore, compose } from 'redux'

import multiMiddleware from './middleware/multi'

import { initialState } from './model/initialize'
import reducer from './reducers'

const middleware = applyMiddleware(
  multiMiddleware
)

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  reducer,
  initialState(),
  composeEnhancers(middleware)
)
