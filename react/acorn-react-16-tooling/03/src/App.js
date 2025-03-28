import React, { Component } from 'react';
import './App.css';
import Heading from './Heading';
import Button from './Button';
import { hot } from 'react-hot-loader/root';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Heading>
          My App Heading
        </Heading>
        <Button />
      </div>
    );
  }
}

export default hot(App);
