import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from './redux';
import reducer from './reducer';

const store = createStore(reducer, 0);

class App extends Component {
  increment () {
    store.dispatch(function(dispatch, getState) {
      setTimeout(() => {
        dispatch({ type: 'INCREMENT' });
      }, 1000);
    });
  }
  decrement () {
    store.dispatch({ type: 'DECREMENT' });
  }

  render() {
    return (
      <div>
        <button onClick={this.increment.bind(this)}>증가</button>
        <button onClick={this.decrement.bind(this)}>감소</button>
        <div>Output: {this.props.state}</div>
      </div>
    );
  }
}

store.subscribe(state => {
  ReactDOM.render(
    <App state={state} />,
    document.getElementById('root')
  );
});
