import React from 'react';
import ReactJSon from 'react-json-view';

export const customInput = props => {
  return (
    <div>
      <label>{props.label}</label>
      <input {...props.input} type={props.type} />
      <ReactJSon src={props.meta} />
    </div>
  )
}

export const customSelect = props => {
  return (
    <div>
      <label>{props.label}</label>
      <select {...props.input}>
        <option vale='tabs'>Tabs</option>
        <option value='spaces'>Spaces</option>
      </select>
      <ReactJSon src={props.meta} />
    </div>
  )   
}
