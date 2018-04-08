import React, { Component, Fragment } from 'react';

class ReturnTypes extends Component {
  render() {
    // return (
    //   <Fragment>
    //     <header />
    //     <div />
    //     <footer />
    //   </Fragment>
    // )
    return 'hello';
  }
}

class App extends Component {
  render() {
    return (<Fragment>
      <ReturnTypes />
    </Fragment>);
  }
}

export default App;
