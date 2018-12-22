import React from 'react'
import PropTypes from 'prop-types'

import pick from 'crocks/helpers/pick'
import unit from 'crocks/helpers/unit'

import { connect } from 'react-redux'

import { startGame } from './data/reducers/game'

import './Game.css'

import Bunny from './components/Bunny'
import Feedback from './components/Feedback'
import Messages  from './components/Messages'
import PlayArea from './components/PlayArea'
import GameOver from './components/GameOver'

const Game = props => {
  const {
    answer, cards, hasWon, hint,
    isCorrect, moves, start, rank,
    restart
  } = props

  return (
    <div className="game">
      <Bunny rank={rank} />
      <PlayArea answer={answer} cards={cards} startGame={start} />
      <Messages hint={hint} moves={moves} />
      <Feedback isCorrect={isCorrect} />
      <GameOver hasWon={hasWon} restartGame={restart} />
    </div>
  )
}

Game.propTypes = {
  answer: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
  isCorrect: PropTypes.bool,
  hasWon: PropTypes.bool,
  hint: PropTypes.object.isRequired,
  moves: PropTypes.number.isRequired,
  start: PropTypes.func.isRequired,
  rank: PropTypes.number.isRequired,
  restart: PropTypes.func.isRequired,
}

const mapState = pick([
  'cards', 'hasWon', 'hint',
  'isCorrect', 'moves', 'rank'
])

const mapDispatch = dispatch => ({
  answer: unit,
  restart: unit,
  start: () => dispatch(startGame()),
})

export default connect(mapState, mapDispatch)(Game)
