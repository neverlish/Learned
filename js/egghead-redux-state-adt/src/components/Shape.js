import React from 'react'
import PropTypes from 'prop-types'

import cnz from 'classnames'

import './Shape.css'

const Shape = ({ color, shape }) => {
  const shapeClasses = cnz([
    'shape__glyph', color, shape
  ])

  return (
    <div className="shape">
      <div className={shapeClasses}></div>
    </div>
  )
}

Shape.propTypes = {
  color: PropTypes.string.isRequired,
  shape: PropTypes.string.isRequired,
}

export default Shape
