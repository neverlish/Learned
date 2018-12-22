import React from 'react'
import PropTypes from 'prop-types'

import './Bunny.css'

const Bunny = ({ rank }) =>
  <div className="bunny">
    <img alt="bunny" className="bunny__image" src={`${rank}.png`} />
  </div>

Bunny.propTypes = {
  rank: PropTypes.number.isRequired
}

export default Bunny
