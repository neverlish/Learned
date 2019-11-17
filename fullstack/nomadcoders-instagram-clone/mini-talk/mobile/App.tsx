import React from 'react';
import { ApolloProvider } from "react-apollo-hooks";
import client from "./apollo";
import Chat from "./Chat";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Chat />
    </ApolloProvider>
  );
}
