import { gql, useQuery } from "@apollo/client";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList, KeyboardAvoidingView, ViewProps } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { seeRoom, seeRoomVariables, seeRoom_seeRoom_messages } from "../__generated/seeRoom";

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

const MessageContainer = styled.View<ViewProps & { outGoing: boolean }>`
  padding: 0px 10px;
  flex-direction: ${(props) => (props.outGoing ? "row-reverse" : "row")};
  align-items: flex-end;
`;
const Author = styled.View``;
const Avatar = styled.Image`
  height: 20px;
  width: 20px;
  border-radius: 25px;
`;
const Message = styled.Text`
  color: white;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 5px 10px;
  overflow: hidden;
  border-radius: 10px;
  font-size: 16px;
  margin: 0px 10px;
`;
const TextInput = styled.TextInput`
  margin-bottom: 50px;
  margin-top: 25px;
  width: 95%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  color: white;
  border-radius: 1000px;
`;

export default function Room({ route, navigation }: { route: RouteProp<any>, navigation: NavigationProp<any> }) {
  const { data, loading } = useQuery<seeRoom, seeRoomVariables>(ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });
  const renderItem = ({ item: message }: { item: seeRoom_seeRoom_messages }) => (
    <MessageContainer
      outGoing={message.user.username !== route?.params?.talkingTo?.username}
    >
      <Author>
        <Avatar source={{ uri: message.user.avatar }} />
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
      behavior="padding"
      keyboardVerticalOffset={50}
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
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          placeholder="Write a message..."
          returnKeyLabel="Send Message"
          returnKeyType="send"
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}