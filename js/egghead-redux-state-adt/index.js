import log from './logger'

import { createAction } from './data/helpers'
import { selectCard } from './data/reducers/turn'
import reducer from './data/reducers'

const sillyVerb =
  createAction('SILLY_VERB')

const state = {
  cards: [
    { id: 'orange-square', color: 'orange', shape: 'square' },
    { id: 'blue-circle', color: 'blue', shape: 'circle' },
    { id: 'green-circle', color: 'greeen', shape: 'circle' },
  ],
  left: 8,
  moves: 0,
}

log(
  reducer(
    state,
    selectCard('orange-square')
  )
)
