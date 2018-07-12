import React from 'react'

const Controls = ({ paused, onPausedToggle }) => 
  <div className='field is-grouped is-grouped-centered'>
    <p className='control'>
      <button className='button is-danger is-outlined is-rounded is-medium'
              disabled={paused} 
              onClick={onPausedToggle}>
        Pause
      </button>
    </p>
    <p className='control'>
      <button className='button is-success is-outlined is-rounded is-medium' 
              disabled={!paused} 
              onClick={onPausedToggle}>
        Resume
      </button>
    </p>
  </div>

export default Controls
