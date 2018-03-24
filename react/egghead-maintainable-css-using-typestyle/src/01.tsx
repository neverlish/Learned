import { style } from 'typestyle';
import * as React from 'react';

const className = style({
  color: 'darkorange',
  position: 'relative'
})

export default () => {
  return (
    <div className={className}>
      Hello world react
    </div>
  )
}
