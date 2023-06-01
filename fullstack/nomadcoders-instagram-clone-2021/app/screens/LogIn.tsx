import { NavigationProp } from "@react-navigation/native";
import React from "react";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

export default function Login({ navigation }: { navigation: NavigationProp<{ CreateAccount: undefined }> }) {
  return (
    <AuthLayout>
      <TextInput
        placeholder="Username"
        returnKeyType="next"
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
      />
    </AuthLayout>
  );
}