import { withAuthenticator } from 'aws-amplify-react';
import React, { Component } from 'react';

import { CreateAuctionForm } from './CreateAuctionForm';
import { Auctions } from './Auctions';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CreateAuctionForm />
        <Auctions />
      </div>
    );
  }
}

export default withAuthenticator(App);
