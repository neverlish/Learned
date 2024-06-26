import React, { Component } from 'react';

import { withAuthenticator } from 'aws-amplify-react';

import { API } from 'aws-amplify'

class App extends Component {
  state = { people: [] }

  async componentDidMount() {
    const data = await API.get('peopleapi', '/people');
    this.setState({ people: data.people });
  }
  render() {
    return (
      <div className="App">
        {
          this.state.people.map((person, i) => (
            <div key={i}>
              <h3>{person.name}</h3>
              <p>{person.hair_color}</p>
            </div>
          ))
        }
      </div>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });
