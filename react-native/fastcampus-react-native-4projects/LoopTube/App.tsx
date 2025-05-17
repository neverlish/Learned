import queryString from 'query-string';
import React, {useCallback, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: '#242424',
  },
  input: {
    fontSize: 15,
    color: '#AEAEB2',
    paddingVertical: 0,
    flex: 1,
    marginRight: 4,
  },
  inputContainer: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const App = () => {
  const [url, setUrl] = useState('');
  const [youTubeId, setYouTubeId] = useState('');
  const onPressOpenLink = useCallback(() => {
    const {
      query: {v: id},
    } = queryString.parseUrl(url);
    console.log('id', id);
    if (typeof id === 'string') {
      setYouTubeId(id);
    } else {
      Alert.alert('잘못된 URL입니다.');
    }
  }, [url]);

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="클릭하여 링크를 삽입하세요"
          placeholderTextColor="#AEAEB2"
          onChangeText={setUrl}
          value={url}
          inputMode="url"
        />
        <TouchableOpacity
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          onPress={onPressOpenLink}>
          <Icon name="add-link" color="#AEAEB2" size={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;
