import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import ShoppingScreen from './screens/ShoppingScreen';
import {RootStackParamList, RouteNames} from './routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BrowserScreen from './screens/BrowserScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={RouteNames.HOME} component={HomeScreen} />
      <Tab.Screen name={RouteNames.SHOPPING} component={ShoppingScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={RouteNames.HOME_TAB}
          component={HomeTab}
          options={{headerShown: false}}
        />
        <Stack.Screen name={RouteNames.BROWSER} component={BrowserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
