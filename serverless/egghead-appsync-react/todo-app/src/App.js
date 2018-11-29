import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const ListTodos = gql`
  query {
    listTodos {
      items {
        id title completed
      }
    }
  }
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        {
          this.props.todos.map((item, i) => (
            <p key={i}>{ item.title }</p>
          ))
        }
      </div>
    );
  }
}

export default compose(
  graphql(ListTodos, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      todos: props.data.listTodos ? props.data.listTodos.items : []
    })
  })
)(App);
