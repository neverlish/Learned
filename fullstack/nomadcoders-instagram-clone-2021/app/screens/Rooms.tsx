import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { seeRooms, seeRooms_seeRooms } from "../__generated/seeRooms";
import ScreenLayout from "../components/ScreenLayout";
import { ROOM_FRAGMENT } from "../fragments";

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomParts
    }
  }
  ${ROOM_FRAGMENT}
`;

const RoomContainer = styled.View`
  background-color: black;
`;
const RoomText = styled.Text`
  color: white;
`;

export default function Rooms() {
  const { data, loading } = useQuery<seeRooms>(SEE_ROOMS_QUERY);
  const renderItem = ({ item: room }: { item: seeRooms_seeRooms | null }) => (
    <RoomContainer>
      <RoomText>
        {room?.unreadTotal === 0
          ? "Name of the other person"
          : `${room?.unreadTotal} messages.`}
      </RoomText>
    </RoomContainer>
  );
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        data={data?.seeRooms}
        keyExtractor={(room) => "" + room?.id}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
}