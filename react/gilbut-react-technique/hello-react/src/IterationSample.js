import React, { Component } from 'react';

class IterationSample extends Component {
  render() {
    const names = ['눈사람', '얼음', '눈', '바람'];
    const nameList = names.map(
      (name, index ) => (<li key={index}>{name}</li>)
    );

    return (
      <ul>
        {nameList}
      </ul>
    )
  }
}

export default IterationSample;
