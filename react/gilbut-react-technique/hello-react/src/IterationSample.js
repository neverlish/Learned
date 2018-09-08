import React, { Component } from 'react';

class IterationSample extends Component {
  state = {
    names: ['눈사람', '얼음', '눈', '바람']
  };

  render() {
    const nameList = this.state.names.map(
      (name, index) => (<li key={index}>{name}</li>)
    );

    return (
      <ul>
        {nameList}
      </ul>
    )
  }
}

export default IterationSample;
