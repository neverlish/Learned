import React from 'react'
import PropTypes from 'prop-types'

import './PlayArea.css'

import Card from './Card'
import Start from './Start'

const buildCard = (answer, { id, color, shape, selected }) =>
  <Card
    key={id}
    answer={() => answer(id)}
    color={color}
    shape={shape}
    selected={selected}
  />

buildCard.propTypes = {
  color: PropTypes.string,
  id: PropTypes.string,
  selected: PropTypes.bool,
  shape: PropTypes.string,
}

const PlayArea = ({ answer, cards, startGame }) =>
  <div className="playArea">{
    cards.length
      ? cards.map(card => buildCard(answer, card))
      : <Start start={startGame} />
  }</div>

PlayArea.propTypes = {
  answer: PropTypes.func,
  cards: PropTypes.array,
  startGame: PropTypes.func,
}

export default PlayArea
