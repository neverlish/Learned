// 03 The Basics - 10 Components - State and Stateless

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
        {/* <h1>{this.state.headerText}</h1>
        <p>{this.state.contentText}</p> */}
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
      data: [
        {
          'id': 1,
          'name': 'Foo',
          'age': '30'
        },
        {
          'id': 2,
          'name': 'Bar',
          'age': '20'
        },
        {
          'id': 3,
          'name': 'Baz',
          'age': '35'
        }
      ]
    };
  }
  render() {
    return (
      <div className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((person, i) => <TableRow key={i} data={person}/>)}
          </tbody>
        </table>
      </div>
    );
  }
}

class TableRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.data.id}</td>
        <td>{this.props.data.name}</td>
        <td>{this.props.data.age}</td>
      </tr>
    );
  }
}

export default App;
