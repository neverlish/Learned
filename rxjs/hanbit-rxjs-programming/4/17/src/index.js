import React, { Component } from 'react';
import { createStore } from './redux';
import reducer from './reducer';

const store = createStore(reducer, 0);

class App extends Component {
  increment () {
    store.dispatch({ type: 'INCREMENT' });
  }
  decrement () {
    store.dispatch({ type: 'DECREMENT' });
  }

  render() {
    return <div>Output: {this.props.state}</div>;
  }
}
