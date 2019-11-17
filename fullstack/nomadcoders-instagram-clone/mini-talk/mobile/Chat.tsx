import React from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import withSuspense from "./withSuspense";

const CHAT = gql`
  query messages {
    messages {
      id
      text
    }
  }
`;

function Chat() {
  const { data, error } = useQuery(CHAT, { suspend: true });
  console.log(data);
  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 50,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
      }}
    >
      <Text>Hello</Text>
    </ScrollView>
  );
}

export default withSuspense(Chat);