import React from 'react'
import PropTypes from 'prop-types'

import isNil from 'crocks/predicates/isNil'

import './GameOver.css'

const GameOver = ({ hasWon, restartGame }) =>
  isNil(hasWon) ? null :
    <div className="gameOver">
      <div className="gameOver__modal">
        <div className="gameOver__text">
          You Have {hasWon ? 'Won' : 'Lost'}!
        </div>
        <div className="gameOver__buttons">
          <button className="button" onClick={restartGame}>End Game</button>
        </div>
      </div>
    </div>

GameOver.propTypes = {
  hasWon: PropTypes.bool,
  restartGame: PropTypes.func.isRequired
}

export default GameOver
