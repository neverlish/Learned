import React, { useState } from 'react';

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = event => {
    const {
      target: { value }
    } = event;
    let willUpdate = true;
    if (typeof validator === 'function') {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

const App = () => {
  const maxLen = (value) => !value.includes('@');
  const name = useInput('Mr.', maxLen);
  return (
    <div>
      <h1>Hello</h1>
      <input placeholder='Name' {...name} />
    </div>
  )
}

export default App;