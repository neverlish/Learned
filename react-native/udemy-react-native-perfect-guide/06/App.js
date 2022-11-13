import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CategoriesScreen from './screens/CategoriesScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import FavoritesContextProvider from './store/context/favorites-context';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return <Drawer.Navigator screenOptions={{
    headerStyle: { backgroundColor: '#351401' },
    headerTintColor: 'white',
    sceneContainerStyle: { backgroundColor: '#3f2f25' },
    drawerContentStyle: { backgroundColor: '#351401' },
    drawerInactiveTintColor: 'white',
    drawerActiveTintColor: '#351401',
    drawerActiveBackgroundColor: '#e4baa1',
  }}>
    <Drawer.Screen 
      name='Categories' 
      component={CategoriesScreen} 
      options={{
        title: 'All Categories',
        drawerIcon: ({ color, size }) => <Ionicons name='star' color={color} size={size} />
      }}
    />
    <Drawer.Screen name='Favorites' component={FavoritesScreen} />
  </Drawer.Navigator>;
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <FavoritesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: '#351401' },
              headerTintColor: 'white',
              contentStyle: { backgroundColor: '#3f2f25'}
            }}
          >
            <Stack.Screen
              name='Drawer'
              component={DrawerNavigator}
              options={{
                title: 'All Categories',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='MealsOverview'
              component={MealsOverviewScreen}
              // options={({ route, navigation }) => {
              //   const catId = route.params.categoryId;
              //   return {
              //     title: catId,
              //   };
              // }}
            />
            <Stack.Screen 
              name='MealDetail'
              component={MealDetailScreen}
              options={{
                title: 'About the Meal',
              }}
            />
          </Stack.Navigator> 
        </NavigationContainer>
      </FavoritesContextProvider>
    </>
  ); 
}

const styles = StyleSheet.create({
  container: {},
});
