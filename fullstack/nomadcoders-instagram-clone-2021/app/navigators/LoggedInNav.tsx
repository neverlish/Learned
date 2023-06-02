import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";
import TabIcon from "../components/nav/TabIcon";
import Feed from "../screens/Feed";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import Search from "../screens/Search";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "black", borderTopColor: "rgba(255,255,255,0.5)" },
        tabBarActiveTintColor: "white",
      }}
    >
      <Tabs.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"home"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"search"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Camera"
        component={View}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"camera"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"heart"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"person"} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
