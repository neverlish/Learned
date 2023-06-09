import { RouteProp } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

export default function UploadForm({ route }: { route: RouteProp<any> }) {
  console.log(route);
  return (
    <View>
      <Text>Text</Text>
    </View>
  );
}