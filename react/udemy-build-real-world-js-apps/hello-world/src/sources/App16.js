// 03 The Basics - 16 Forms in React - Part 1

import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);
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
  constructor(props) {
    super(props);

    this.state = {
      myInputValue: 'My Input'
    }
    this.myInputChanged = this.myInputChanged.bind(this);
  }

  myInputChanged(e) {
    this.setState({
      myInputValue: e.target.value
    })
  }

  render() {
    return (
      <div className="App-intro">
        <h1>Forms in React!</h1>
        <p>In this lecture, we will go over Forms in React</p>
        <MyInputComponent inputValue={this.state.myInputValue} myInputChanged={this.myInputChanged}/>
        <h4>{this.state.myInputValue}</h4>
      </div>
    );
  }
}

class MyInputComponent extends Component {
  render() {
    return (
      <div>
        <input value={this.props.inputValue} onChange={this.props.myInputChanged}/>
      </div>
    )
  }
}

export default App;
