import React from 'react'
import Control from './Control'

export default ({ paused, onPausedToggle }) => 
  <div className='field is-grouped is-grouped-centered'>
    <Control disabled={paused} color='danger' onClick={onPausedToggle}>
      Pause
    </Control>
    <Control disabled={!paused} color='success' onClick={onPausedToggle}>
      Resume
    </Control>
  </div>
