// 03 The Basics - 14 Components API

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      count: 0,
    }

    this.updateMyState = this.updateMyState.bind(this);
    this.forceUpdateRandomNumber = this.forceUpdateRandomNumber.bind(this);
    this.findMyDOMNode = this.findMyDOMNode.bind(this);
  }

  updateMyState() {
    var count = this.state.count;
    count++;
    var item = 'Click - ' + count;
    var myArray = this.state.data;
    myArray.push(item);
    this.setState({
      data: myArray,
      count: count
    });
  }

  forceUpdateRandomNumber() {
    this.forceUpdate();
  }

  findMyDOMNode() {
    var myDiv = document.getElementById('myDiv');
    ReactDOM.findDOMNode(myDiv).style.color = 'red';
  }

  render() {
    return (
      <div className="App-intro">
        <h1>Prop Validations!</h1>
        <p>In this lecture, we will go over the Components API</p>
        <button onClick={this.updateMyState}>Click Me</button>
        <h4>State Data: {this.state.data}</h4>
        <button onClick={this.forceUpdateRandomNumber}>Random Number</button>
        <h4>Random Number: {Math.random()}</h4>
        <button onClick={this.findMyDOMNode}>Find My DOM Node</button>
        <div id='myDiv'>This is my DIV</div>
      </div>
    );
  }
}

export default App;
