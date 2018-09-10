import _ from 'underscore'
import * as types from './mutation_types'
import { WORKING_TIME, RESTING_TIME } from '../config'

function togglePomodoro (state, toggle) {
  if (_.isBoolean(toggle) === false) {
    toggle = !state.isWorking
  }
  state.isWorking = toggle
  state.counter = state.isWorking ? WORKING_TIME : RESTING_TIME
}

function tick (state) {
  if (state.counter === 0) {
    togglePomodoro(state)
  }
  state.counter--
}

export default {
  [types.START] (state) {
    state.started = true
    state.paused = false
    state.stopped = false
    state.interval = setInterval(() => tick(state), 1000)
  },
  [types.PAUSE] (state) {
    state.paused = true
    state.started = true
    state.stopped = false
    clearInterval(state.interval)
  },
  [types.STOP] (state) {
    state.stopped = true
    state.paused = false
    state.started = false
    clearInterval(state.interval)
    togglePomodoro(state, true)
  }
}
