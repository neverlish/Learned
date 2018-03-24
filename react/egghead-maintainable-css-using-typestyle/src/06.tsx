import { style, classes } from 'typestyle';
import * as React from 'react';

const baseClassName = style(
  { color: '#333' }
)

const errorClassName = style(
  { backgroundColor: 'red' }
)

export const className = style(
  { fontSize: '30px' }
)

export default ({ className, hasError }: {className?: string, hasError}) => {
  return (
    <div className={
      // baseClassName 
      // + (className ? ' ' + className : '')
      // + (hasError ? ' ' + errorClassName : '')
      classes(
        baseClassName,
        className,
        hasError && errorClassName
      )
    }>
      Hello world
    </div>
  )
}
