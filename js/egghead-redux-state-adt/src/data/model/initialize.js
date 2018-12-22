import State from 'crocks/State'

const { put } = State

// initialState :: () -> AppState
export const initialState = () => ({
  colors: [ 'orange', 'green', 'blue', 'yellow' ],
  shapes: [ 'triangle', 'circle', 'square' ],
  cards: [],
  hint: {},
  isCorrect: null,
  left: 8,
  moves: 0,
  rank: 4,
  seed: 23,
})

// initialize :: () -> State AppState ()
const initialize = () =>
  put(initialState())

export default initialize
