import React from "react";
import ReactDOM from "react-dom";
import ApolloBoostClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import registerServiceWorker from "./registerServiceWorker";
import Routes from "./routes";

const client = new ApolloBoostClient({
  uri: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include"
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
