import React from 'react'
import PropTypes from 'prop-types'

import './Start.css'

const Start = ({ start }) =>
  <div className="start">
    <button
      className="button start__button"
      onClick={start}
    >Start Game</button>
  </div>

Start.propTypes = {
  start: PropTypes.func.isRequired
}

export default Start
