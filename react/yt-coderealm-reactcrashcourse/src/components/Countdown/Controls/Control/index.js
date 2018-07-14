import React from 'react'

export default ({ disabled, onClick, color, children }) => 
  <p className='control'>
    <button className={'button is-outlined is-rounded is-medium is-' + color}
            disabled={disabled} 
            onClick={onClick}>
      {children}
    </button>
  </p>
