import React, { Component } from 'react';

import { withAuthenticator } from 'aws-amplify-react';

class App extends Component {
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });
