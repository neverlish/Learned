import log from './logger'

import { showFeedback, selectCard } from './data/reducers/turn'
import reducer from './data/reducers'
import start, { markCardsUnselected } from './data/model/game'
import { hideAllCards } from './data/reducers/game';

const state = {
  colors: [ 'orange', 'green', 'blue', 'yellow' ],
  shapes: [ 'square', 'circle', 'triangle' ],
  cards: [],
  isCorrect: null,
  hint: {
    color: 'green',
    shape: 'triangle'
  },
  left: 8,
  moves: 0,
  rank: 4,
  seed: 42,
}

const gameState =
  start()
    .chain(markCardsUnselected)
    .execWith(state)

log(
  reducer(
    gameState,
    hideAllCards()
  ).cards
)
