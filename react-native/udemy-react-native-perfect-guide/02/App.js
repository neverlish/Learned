import { Button, StyleSheet, TextInput, View, Text } from 'react-native';

export default function App() {
  return (
    <View style={styles.appContainer}>
      <View>
        <TextInput placeholder='Your course goal!' />
        <Button title='Add Goal' />
      </View>
      <View>
        <Text>List of goals...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    padding: 50,
  }  
});
