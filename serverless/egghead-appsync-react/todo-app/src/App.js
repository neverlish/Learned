import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { graphqlMutation } from 'aws-appsync-react';

const CreateTodo = gql`
  mutation($title: String!, $completed: Boolean) {
    createTodo(input: {
      title: $title,
      completed: $completed
    }) {
      id title completed
    }
  }
`

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
  state = { todo: '' }

  addTodo = () => {
    if (this.state.todo === '') return;

    const todo = {
      title: this.state.todo,
      completed: false
    };
    this.props.createTodo(todo);
    this.setState({ todo: '' })
  }

  render() {
    return (
      <div className="App">
        <input
          onChange={e => this.setState({ todo: e.target.value })}
          value={this.state.todo}
          placeholder='Todo name '
        />
        <button onClick={this.addTodo}>Add Todo</button>
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
  graphqlMutation(CreateTodo, ListTodos, 'Todo'),
  graphql(ListTodos, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      todos: props.data.listTodos ? props.data.listTodos.items : []
    })
  })
)(App);
