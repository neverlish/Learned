import React from 'react';
import ReactJSon from 'react-json-view';

export const customInput = props => {
  const { label, input, type, meta } = props;
  return (
    <div>
      <label>{label}</label>
      <input {...input} type={type} />
      {(meta.error && meta.touched) && (
        <div style={{color: 'red'}}>{meta.error}</div>
      )}
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
    </div>
  )   
}
