import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EasyABC from './components/EasyABC';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          Easy ABC
        </div>
        <EasyABC/>
      </div>
    );
  }
}

export default App;
