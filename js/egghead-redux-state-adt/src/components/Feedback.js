import React from 'react'
import PropTypes from 'prop-types'

import isNil from 'crocks/predicates/isNil'

import './Feedback.css'

const Feedback = ({ isCorrect }) =>
  isNil(isCorrect) ? null :
    <div className="feedback">
      <div className="feedback__box">
        <div className="feedback__text">
          {isCorrect ? 'Correct!' : 'Incorrect'}
        </div>
      </div>
    </div>

Feedback.propTypes = {
  isCorrect: PropTypes.bool,
}

export default Feedback
