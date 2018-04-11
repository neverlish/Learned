import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <nav data-testid='navbar' className='navbar' role='navigation'>
            <ul>
              <li data-testid="navBarLi" className='nav-li'><a href="#">Home</a></li>
              <li data-testid="navBarLi" className='nav-li'><a href="#">About</a></li>
              <li data-testid="navBarLi" className='nav-li'><a href="#">Skills</a></li>
              <li data-testid="navBarLi" className='nav-li'><a href="#">Works</a></li>
            </ul>
          </nav>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
