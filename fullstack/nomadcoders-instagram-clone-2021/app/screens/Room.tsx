import { gql, useQuery } from "@apollo/client";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { FlatList, KeyboardAvoidingView } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { seeRoom, seeRoomVariables, seeRoom_seeRoom, seeRoom_seeRoom_messages } from "../__generated/seeRoom";

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

const MessageContainer = styled.View``;
const Author = styled.View``;
const Avatar = styled.Image``;
const Username = styled.Text`
  color: white;
`;
const Message = styled.Text`
  color: white;
`;
const TextInput = styled.TextInput`
  margin-bottom: 50px;
  width: 95%;
  background-color: white;
  padding: 10px 20px;
  border-radius: 1000px;
`;

export default function Room({ route, navigation }: { route: RouteProp<any>, navigation: NavigationProp<any> }) {
  const { data, loading } = useQuery<seeRoom, seeRoomVariables>(ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });
  const renderItem = ({ item: message }: { item: seeRoom_seeRoom_messages }) => (
    <MessageContainer>
      <Author>
        <Avatar source={{ uri: message.user.avatar }} />
        <Username>{message.user.username}</Username>
      </Author>
      <Message>{message.payload}</Message>
    </MessageContainer>
  );
  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.talkingTo?.username}`,
    });
  }, []);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "black" }}
      behavior="height"
      keyboardVerticalOffset={100}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          inverted
          style={{ width: "100%" }}
          data={data?.seeRoom?.messages?.map((m) => m!)}
          keyExtractor={(message) => "" + message.id}
          renderItem={renderItem}
        />
        <TextInput
          placeholder="Write a message..."
          returnKeyLabel="Send Message"
          returnKeyType="send"
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}