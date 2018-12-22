import log from './logger'

import {
  startGame, hideAllCards
} from './data/reducers/game'

import {
  selectCard, showFeedback, startTurn
} from './data/reducers/turn'

import store from './data/store'

const { dispatch, getState } = store

dispatch(startGame())
dispatch(hideAllCards())
dispatch(startTurn())

dispatch(selectCard('blue-square'))
dispatch(showFeedback('blue-square'))
dispatch(startTurn())

dispatch(selectCard('orange-triangle'))
dispatch(showFeedback('orange-triangle'))
dispatch(startTurn())

dispatch(selectCard('green-triangle'))
dispatch(showFeedback('green-triangle'))
dispatch(startTurn())

log(
  getState()
)
