import React, { ReactElement } from "react";
import { ActivityIndicator, View } from "react-native";

export default function ScreenLayout({ loading, children }: { loading: boolean; children: ReactElement[] | ReactElement }) {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? <ActivityIndicator color="white" /> : children}
    </View>
  );
}