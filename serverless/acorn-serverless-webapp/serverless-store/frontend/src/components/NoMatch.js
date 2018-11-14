import React, { Component } from 'react';

class NoMatch extends Component {
  render() {
    return (
      <div className="panel-body">
        <h4 className="alert alert-warning">Page not found</h4>
      </div>
    );
  }
}

export default NoMatch;
