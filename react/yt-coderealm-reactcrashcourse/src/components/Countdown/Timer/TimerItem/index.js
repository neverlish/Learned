import React from 'react'

export default ({ count, label }) =>
  <div className='level-item has-text-centered'>
    <div>
      <p className='title'>
        {count}
      </p>
      <p className='heading'>
        {label}
      </p>
    </div>
  </div>
