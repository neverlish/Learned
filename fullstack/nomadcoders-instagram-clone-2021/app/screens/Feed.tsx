import { gql, useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { seeFeed, seeFeedVariables, seeFeed_seeFeed } from "../__generated/seeFeed";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export default function Feed({ navigation }: { navigation: NavigationProp<any> }) {
  const { data, loading, refetch, fetchMore } = useQuery<seeFeed, seeFeedVariables>(FEED_QUERY, { variables: { offset: 0 }});
  const renderPhoto = ({ item: photo }: { item: seeFeed_seeFeed }) => {
    return <Photo {...photo} />;
  };
  const refresh = async () => {
    setRefreshing(true);
    await refetch();  
    setRefreshing(false);
  };
  const MessagesButton = () => (
    <TouchableOpacity
      style={{ marginRight: 25 }}
      onPress={() => navigation.navigate("Messages")}
    >
      <Ionicons name="paper-plane" color="white" size={20} />
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: MessagesButton,
    });
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.02}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeFeed?.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={(photo) => "" + photo.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
}