import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Detail from '../screens/Detail';
import Tabs from './Tabs';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Screen name='Tab' component={Tabs} />
    <Stack.Screen name='Detail' component={Detail} />
  </Stack.Navigator>
);
