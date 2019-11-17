import React from 'react';
import { Platform, View } from "react-native";
import { createBottomTabNavigator, createStackNavigator } from "react-navigation";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcon";
import Home from "../screens/Tabs/Home";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import Detail from "../screens/Detail";
import Search from "../screens/Tabs/Search";
import { stackStyles } from "./config";

const stackFactory = (initialRoute, customConfig) => createStackNavigator({
  InitialRoute: {
    screen: initialRoute,
    navigationOptions: {
      ...customConfig,
      headerStyle: { ...stackStyles }
    },
  },
  Detail
});

export default createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        headerRight: <MessagesLink />,
        headerTitle: <NavIcon name='logo-instagram' size={36} />
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
          />
        )
      }
    },
    Search: {
      screen: stackFactory(Search),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
          />
        )
      }
    },
    Add: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate('PhotoNavigation'),
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            size={32}
            name={
              Platform.OS === "ios"
                ? "ios-add-circle-outline"
                : "md-add-circle-outline"
            }
          />
        )
      }
    },
    Notifications: {
      screen: stackFactory(Notifications, {
        title: "Notifications"
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={
              Platform.OS === "ios"
                ? focused
                  ? "ios-heart"
                  : "ios-heart-empty"
                : focused
                  ? "md-heart"
                  : "md-heart-empty"
            }
          />
        )
      }
    },
    Profile: {
      screen: stackFactory(Profile, {
        title: "Profile"
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
          />
        )
      }
    },
  },
  {
    initialRouteName: 'Search',
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: "#FAFAFA"
      }
    }
  }
);