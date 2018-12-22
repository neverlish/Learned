import React from 'react'
import PropTypes from 'prop-types'

import './Moves.css'

const Moves = ({ moves }) =>
  <div className="moves">
    <div className="moves__value">{moves}</div>
  </div>

Moves.propTypes = {
  moves: PropTypes.number,
}

export default Moves
