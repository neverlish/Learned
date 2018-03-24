import { style, media } from 'typestyle';
import * as React from 'react';

const className = style(
  { 
    color: 'red',
    transition: 'font-size .2s',
  },
  media({ minWidth: 500, maxWidth: 700 }, { fontSize: '30px' }),
  media({ minWidth: 701 }, { fontSize: '50px' }),
)

export default () => {
  return (
    <div className={className}>
      Hello world Media Queries
    </div>
  )
}

