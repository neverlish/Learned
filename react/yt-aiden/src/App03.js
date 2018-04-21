import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
  render() {
    let content = this.props.content
    return (
      <div>
        <h1>{content}</h1>
        <h2>hi</h2>
      </div>
    );
  }
}

App.propTypes = {
  content: PropTypes.string,
  baby: PropTypes.number.isRequired
}

App.defaultProps = {
  content: 'this is default content'
}

export default App;
