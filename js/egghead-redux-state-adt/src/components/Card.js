import React from 'react'
import PropTypes from 'prop-types'

import cnz from 'classnames'

import './Card.css'

import Shape from './Shape'

const Card = ({ answer, color, shape, selected }) => {
  const classes = cnz('card__inner', {
    flipped: selected
  })

  return (
    <div className="card">
      <div className={classes}>
        <div className="card__front" onClick={answer}></div>
        <div className="card__back">
          <Shape color={color} shape={shape} />
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  answer: PropTypes.func,
  color: PropTypes.string,
  shape: PropTypes.string,
  selected: PropTypes.bool,
}

export default Card
