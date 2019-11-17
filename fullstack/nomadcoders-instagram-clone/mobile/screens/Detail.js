import { gql } from "apollo-boost";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import { ScrollView } from "react-native";
import Loader from "../components/Loader";
import Post from "../components/Post";
import { POST_FRAGMENT } from "../fragments";

const POST_DETAIL = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export default ({ navigation }) => {
  const { loading, data } = useQuery(POST_DETAIL, {
    variables: { id: navigation.getParam('id') }
  })
  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
          data && data.seeFullPost && <Post {...data.seeFullPost} />
        )}
    </ScrollView>
  );
};