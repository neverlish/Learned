import React from 'react'
import PropTypes from 'prop-types'

import './Hint.css'

import Shape from './Shape'

const Hint = ({ color, shape }) => {
  return (
    <div className="hint">{
      color && shape && <Shape color={color} shape={shape} />
    }</div>
  )
}

Hint.propTypes = {
  color: PropTypes.string,
  shape: PropTypes.string,
}

export default Hint
