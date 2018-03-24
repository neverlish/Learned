import { style, types } from 'typestyle';
import * as React from 'react';

const scroll: types.NestedCSSProperties ={
  '-webkit-overflow-scrolling': 'touch',
  overflow: 'auto'
}

const className = style(
  scroll,
  { 
    fontSize: '30px',
    backgroundColor: [
      'rgb(200, 54, 54)', // Fallback
      'rgba(200, 54, 54, 0.5)', // Upgrade
    ]
  }
)

export default () => {
  return (
    <div className={className}>
      Hello world
    </div>
  )
}
