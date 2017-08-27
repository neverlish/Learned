// 03 The Basics - 19 React Router - Part 1

import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import {Link} from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <ul>
          <li><Link to='/home'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/contact'>Contact</Link></li>
          <li><Link to='/blog'>Blog</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default App;
