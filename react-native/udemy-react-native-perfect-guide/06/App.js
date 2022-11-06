import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CategoriesScreen from './screens/CategoriesScreen';

export default function App() {
  return (
    <CategoriesScreen />
  );
}

const styles = StyleSheet.create({
  container: {},
});
