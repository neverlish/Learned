import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';

class App extends Component {
  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default connect(
  state => state,
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(App);
