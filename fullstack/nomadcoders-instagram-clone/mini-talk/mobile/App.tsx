import React, { useState, useEffect } from 'react';
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import { ApolloProvider } from "react-apollo-hooks";
import client from "./apollo";
import Chat from "./Chat";

export default function App() {
  const [notificationStatus, setStatus] = useState(false);
  const ask = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    setStatus(status as any);
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
  };

  useEffect(() => {
    ask();
  }, []);

  return (
    <ApolloProvider client={client}>
      <Chat />
    </ApolloProvider>
  );
}
