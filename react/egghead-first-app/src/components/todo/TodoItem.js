import React from 'react';

export const TodoItem = (props) => {
  return (
    <li key={props.id}>
      <input type='checkbox' checked={props.isComplete}/>{props.name}
    </li>
  )
}

TodoItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  isComplete: React.PropTypes.bool,
  id: React.PropTypes.number.isRequired
}
