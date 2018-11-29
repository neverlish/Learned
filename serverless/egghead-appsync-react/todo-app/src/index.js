import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Client from 'aws-appsync';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';
import AppSync from './AppSync';

const client = new Client({
  url: AppSync.graphqlEndpoint,
  region: AppSync.region,
  auth: {
    type: 'API_KEY',
    apiKey: AppSync.apiKey
  }
})

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
)

ReactDOM.render(<WithProvider />, document.getElementById('root'));

serviceWorker.unregister();
