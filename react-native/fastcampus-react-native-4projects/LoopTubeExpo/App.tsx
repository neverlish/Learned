import React, {useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: '#242424',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  inputConatainer: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  input: {
    fontSize: 15,
    color: '#AEAEB2',
    flex: 1,
    marginRight: 4,
  },
});

export default function App() {
  const [url, setUrl] = useState('');

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.inputConatainer}>
        <TextInput
          style={styles.input}
          placeholder="클릭하여 링크를 삽입하세요"
          placeholderTextColor={'#AEAEB2'}
          onChangeText={setUrl}
          value={url}
          inputMode="url"
        />
        <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Icon name="add-link" size={24} color={'#AEAEB2'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
