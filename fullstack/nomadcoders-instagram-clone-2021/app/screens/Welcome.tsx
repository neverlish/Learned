import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Welcome({ navigation }: { navigation: NavigationProp<{ CreateAccount: undefined, LogIn: undefined }>} ) {
  return (
    <View>
      <Text>Welcome</Text>
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <View>
          <Text>Go to Create Account</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
        <View>
          <Text>Go to Log In</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}