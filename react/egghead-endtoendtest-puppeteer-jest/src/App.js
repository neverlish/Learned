import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login.js';
import SuccessMessage from './SuccessMessage.js';

class App extends Component {
  state = { 
    complete: false,
    firstName: ''
  }

  handleSubmit = e => {
    e.preventDefault()
    if (document.cookie.includes('JWT')) {
      this.setState({ complete: true })
    }
    document.cookie = `firstName=${this.state.firstName}`
  }

  handleInput = e => {
    this.setState({ firstName: e.currentTarget.value })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <nav data-testid='navbar' className='navbar'>
            <ul>
              <li data-testid="navBarLi" className='nav-li'><a href="http://localhost:3000/">Home</a></li>
              <li data-testid="navBarLi" className='nav-li'><a href="http://localhost:3000/">About</a></li>
              <li data-testid="navBarLi" className='nav-li'><a href="http://localhost:3000/">Skills</a></li>
              <li data-testid="navBarLi" className='nav-li'><a href="http://localhost:3000/">Works</a></li>
            </ul>
          </nav>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.complete ?
          <SuccessMessage />
          :
          <Login submit={this.handleSubmit} input={this.handleInput} />
        }
      </div>
    );
  }
}

export default App;
