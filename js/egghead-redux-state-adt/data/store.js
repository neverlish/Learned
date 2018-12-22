import { createStore } from 'redux'

import { initialState } from './model/initialize'

import reducer from './reducers'

export default createStore(reducer, initialState())
