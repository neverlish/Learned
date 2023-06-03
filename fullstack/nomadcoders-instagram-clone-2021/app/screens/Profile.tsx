import { NavigationProp, RouteProp } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

export default function Profile({ navigation, route }: { navigation: NavigationProp<{}>, route: RouteProp<any>}) {
  useEffect(() => {
    if (route?.params?.username) {
      navigation.setOptions({
        title: route.params.username,
      });
    }
  }, []);
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Someones Profile</Text>
    </View>
  );
}