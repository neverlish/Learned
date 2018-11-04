import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    if (!this.props.loading) return null;

    const loadingStyle = {
      backgroound: 'rgba(0, 0, 0, .8) no-repeat',
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 999
    };

    return (
      <div style={loadingStyle} />
    );
  }
}
