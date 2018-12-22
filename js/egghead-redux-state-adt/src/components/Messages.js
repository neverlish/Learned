import React from 'react'
import PropTypes from 'prop-types'

import './Messages.css'

import Hint from './Hint'
import Moves from './Moves'

const Messages = ({ hint, moves }) => {
  const { color, shape } = hint

  return (
    <div className="messages">
      <Hint color={color} shape={shape} />
      <Moves moves={moves} />
    </div>
  )
}

Messages.propTypes = {
  hint: PropTypes.object.isRequired,
  moves: PropTypes.number.isRequired
}

export default Messages
