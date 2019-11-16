import React from 'react';
import { View } from "react-native";
import { createBottomTabNavigator, createStackNavigator } from "react-navigation";
import MessagesLink from "../components/MessagesLink";
import Home from "../screens/Tabs/Home";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import Search from "../screens/Tabs/Search";

const stackFactory = (initialRoute, customConfig) => createStackNavigator({
  InitialRoute: {
    screen: initialRoute,
    navigationOptions: { ...customConfig },
  }
});

export default createBottomTabNavigator({
  Home: {
    screen: stackFactory(Home, {
      title: 'Home',
      headerRight: <MessagesLink />
    }),
  },
  Search: {
    screen: stackFactory(Search, {
      title: 'Search'
    }),
  },
  Add: {
    screen: View,
    navigationOptions: {
      tabBarOnPress: ({ navigation }) => {
        navigation.navigate('PhotoNavigation')
      }
    }
  },
  Notifications: {
    screen: stackFactory(Notifications, {
      title: "Notifications"
    })
  },
  Profile: {
    screen: stackFactory(Profile, {
      title: "Profile"
    })
  },
});