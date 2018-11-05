import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';

import Header from './Header';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import Login from './Login';
import Logout from './Logout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Login
          auth={this.props.auth}
          actions={this.props.actions}
        />
        <Logout
          auth={this.props.auth}
          actions={this.props.actions}
        />
        <Loading 
          loading={this.props.loading} 
        />
        <ErrorMessage
          errorMessage={this.props.errorMessage}
        />
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
