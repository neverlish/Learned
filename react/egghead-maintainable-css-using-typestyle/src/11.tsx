import { style, getStyles } from 'typestyle';
import * as React from 'react';

const className = style({
  color: 'red',
  fontSize: '30px'
})

export default () => {
  return (
    <div className={className}>
      Hello world
    </div>
  )
}
