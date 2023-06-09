import { gql, useQuery } from "@apollo/client";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      messages {
        id
        payload
        user {
          username
          avatar
        }
        read
      }
    }
  }
`;

export default function Room({ route, navigation }: { route: RouteProp<any>, navigation: NavigationProp<any> }) {
  const { data } = useQuery(ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });
  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.talkingTo?.username}`,
    });
  }, []);
  return (
    <View>
      <Text>Messages List</Text>
    </View>
  );
}