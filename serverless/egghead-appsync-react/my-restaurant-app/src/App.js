import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { API, graphqlOperation } from 'aws-amplify';

const query = `
  query {
    listRestaurants {
      items {
        id name description location
      }
    }
  }
`

class App extends Component {
  state ={ restraurants: [] }

  async componentDidMount() {
    const data = await API.graphql(graphqlOperation(query));
    this.setState({
      restraurants: data.data.listRestaurants.items
    });
  }

  render() {
    return (
      <div className="App">
        {
          this.state.restraurants.map((restaurant, index) => (
            <p key={index}>{restaurant.name}</p>
          ))
        }
      </div>
    );
  }
}

export default App;
