import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { movieApi } from "../api";

export default ({ navigation }) => {
  const getData = async () => {
    const [nowPlaying, error] = await movieApi.nowPlaying();
    const [popular, popularError] = await movieApi.popular();
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Text>Movies</Text>
    </View>
  );
};
