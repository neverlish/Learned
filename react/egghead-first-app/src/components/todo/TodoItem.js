import React from 'react';

export const TodoItem = (props) => {
  return (
    <li key={props.id}>
      <input type='checkbox' checked={props.isComplete}/>{props.name}
    </li>
  )
}
