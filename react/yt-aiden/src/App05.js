import React, { Component } from 'react';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      content: 'this is the state content'
    }
  }

  update(e) {
    this.setState({
      content: e.target.value
    })
  }

  render() {
    return (
      <div>
        <input type='text' onChange={this.update.bind(this)} />
        <h1>{this.state.content}</h1>
      </div>
    )
  }
}

export default App;
