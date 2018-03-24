import { style } from 'typestyle';
import * as React from 'react';

const className = style(
  {
    color: 'red',
    transition: 'font-size .2s',
    $nest: {
      '&:hover': {
        fontSize: '50px'
      },
      '&&:focus': {
        fontSize: '30px'
      }
    }
  }
)

export default () => {
  return (
    <button className={className}>
      Hello world States
    </button>
  )
}

