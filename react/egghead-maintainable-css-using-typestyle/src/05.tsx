import { style } from 'typestyle';
import * as React from 'react';

const className = style(
  {
    fontSize: '30px',
    $nest: {
      '&::after': {
        content: `attr(data-after)`
      },
      '&::selection': {
        color: 'gold',
        background: 'black'
      }
    }
  }
)

export default () => {
  return (
    <div className={className} data-after=' Psuedo Again'>
      Hello world
    </div>
  )
}
