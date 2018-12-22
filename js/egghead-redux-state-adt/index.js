import log from './logger'

import { createAction } from './data/helpers'
import { showFeedback, selectCard } from './data/reducers/turn'
import reducer from './data/reducers'

const sillyVerb =
  createAction('SILLY_VERB')

const state = {
  cards: [
    { id: 'orange-square', color: 'orange', shape: 'square' },
    { id: 'blue-circle', color: 'blue', shape: 'circle' },
    { id: 'green-circle', color: 'greeen', shape: 'circle' },
  ],
  hint: {
    color: 'orange',
    shape: 'square'
  },
  isCorrect: null,
  left: 8,
  moves: 0,
  rank: 4,
}

log(
  reducer(
    state,
    showFeedback('orange-square')
  )
)
