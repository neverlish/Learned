import React from 'react';
import logo from './logo.svg';
import './App.css';
import Repeat from './Repeat';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and <em>save</em> to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Repeat times="5" value="React!" />
        </a>
      </header>
    </div>
  );
}

export default App;
