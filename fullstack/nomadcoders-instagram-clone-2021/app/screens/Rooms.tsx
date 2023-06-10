import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList, View } from "react-native";
import { seeRooms, seeRooms_seeRooms } from "../__generated/seeRooms";
import ScreenLayout from "../components/ScreenLayout";
import RoomItem from "../components/rooms/RoomItem";
import { ROOM_FRAGMENT } from "../fragments";
import useMe from "../hooks/useMe";

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomParts
    }
  }
  ${ROOM_FRAGMENT}
`;

export default function Rooms() {
  const { data, loading } = useQuery<seeRooms>(SEE_ROOMS_QUERY);
  const { data: meData } = useMe();
  const renderItem = ({ item: room }: { item: seeRooms_seeRooms }) => <RoomItem {...room} />;
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ItemSeparatorComponent={
          () => <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          ></View>
        }
        style={{ width: "100%" }}
        data={data?.seeRooms?.map((r) => r!)}
        keyExtractor={(room) => "" + room?.id}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
}