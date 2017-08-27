// 03 The Basics - 13 Prop Validations

import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerText: 'Welcome to React',
      contentText: 'In this lecture, we will go over the Component'
    }
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Content />
      </div>
    );
  }
}

App.defaultProps = {
  header: 'Default Props for the Header...',
  content: 'Default Props for the Content...'
}

class Header extends Component {
  render() {
    return (
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
    );
  }
}

class Content extends Component {
  render() {
    return (
      <div>
        <div className="App-intro">
          <h1>Prop Validations!</h1>
          <p>In this lecture, we will go over the Component</p>
        </div>
        <div>
          <h2>Array: {this.props.propArray}</h2>
          <h2>Bool: {this.props.propBool ? 'True' : 'False'}</h2>
          <h2>Func: {this.props.propFunc(5)}</h2>
          <h2>Number: {this.props.propNumber}</h2>
          <h2>String: {this.props.propString}</h2>
          <h2>Object: {this.props.propObject.objectName1}</h2>
          <h2>Object: {this.props.propObject.objectName2}</h2>
          <h2>Object: {this.props.propObject.objectName3}</h2>
        </div>
      </div>
    );
  }
}

Content.propTypes = {
  propArray: React.PropTypes.array.isRequired,
  propBool: React.PropTypes.bool.isRequired,
  propFunc: React.PropTypes.func,
  propNumber: React.PropTypes.number,
  propString: React.PropTypes.string,
  propObject: React.PropTypes.object
}

Content.defaultProps = {
  propArray: [1,2,3,4,5],
  propBool: true,
  propFunc: function(e) {return e},
  propNumber: 1,
  propString: 'String Value...',
  propObject: {
    objectName1: 'objectValue1',
    objectName2: 'objectValue2',
    objectName3: 'objectValue3'
  }
}

export default App;
