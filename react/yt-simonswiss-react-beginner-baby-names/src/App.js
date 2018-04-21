import React, { Component } from 'react';

class App extends Component {
  render() {

    const { data } = this.props;

    const namesList = data.map(name => {
      return (
        <li key={name.id} className={name.sex}>{name.name}</li>
      );
    });

    return (
      <ul>
        {namesList}
      </ul>
    );
  }
}

export default App;
