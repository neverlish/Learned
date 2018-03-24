import { style, keyframes } from 'typestyle';
import * as React from 'react';

const className = style(
  { 
    fontSize: '20px',
    animationName: keyframes({
      // '0%': { color: 'black' },
      // '50%': { color: 'blue' }
      from: { opacity: 0 },
      to: { opacity: 1 }
    }),
    animationDuration: '1s',
    animationIterationCount: 'infinite'
  }
)

export default () => {
  return (
    <div className={className}>
      Hello world
    </div>
  )
}
