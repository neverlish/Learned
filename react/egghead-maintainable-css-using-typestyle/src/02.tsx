import { style } from 'typestyle';
import * as React from 'react';

const fontSize = (value: number | string) => { 
  const valueStr = typeof value === 'string'
    ? value
    : value + 'px';
  return {
    fontSize: valueStr
  }
};

const className = style(
  fontSize('3em'),
  { color: 'red' }
)

export default () => {
  return (
    <div className={className}>
      Hello world Mixins
    </div>
  )
}
