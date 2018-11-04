import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <button>증가</button>
        <button>감소</button>
        <div>Output: {this.state.count}</div>
      </div>
    )
  }
}

export default App;
