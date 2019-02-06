import React, { Component } from 'react';

import { withAuthenticator } from 'aws-amplify-react';

import { graphqlOperation, API } from 'aws-amplify'

const ListTodos = `
  query {
    listTodos {
      items {
        id name description completed
      }
    }
  }
`

class App extends Component {
  state = { todos: [] }

  async componentDidMount() {
    const todoData = await API.graphql(graphqlOperation(ListTodos));
    this.setState({ todos: todoData.data.listTodos.items })
  }
  render() {
    return (
      <div className="App">
        {
          this.state.todos.map((todo, i) => (
            <div key={i}>
              <h3>{todo.name}</h3>
              <p>{todo.description}</p>
            </div>
          ))
        }
      </div>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });
