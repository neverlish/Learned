import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import queryString from 'query-string';
import WebView from 'react-native-webview';

const YT_WIDTH = Dimensions.get('window').width;
const YT_HEIGHT = YT_WIDTH * (9 / 16);

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
  youtubeContainer: {
    width: YT_WIDTH,
    height: YT_HEIGHT,
    backgroundColor: '#4A4A4A',
  },
  controller: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 72,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  playButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App = () => {
  const webViewRef = useRef<WebView | null>(null);
  const [url, setUrl] = useState('');
  const [youTubeId, setYouTubeId] = useState('');
  const [playing, setPlaying] = useState(false);
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

  const source = useMemo(() => {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>

      <body style="margin: 0; padding: 0">
        <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
        <div id="player"></div>

        <script>
          // 2. This code loads the IFrame Player API code asynchronously.
          var tag = document.createElement('script');

          tag.src = "https://www.youtube.com/iframe_api";
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

          // 3. This function creates an <iframe> (and YouTube player)
          //    after the API code downloads.
          var player;
          function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
              height: '${YT_HEIGHT}',
              width: '${YT_WIDTH}',
              videoId: '${youTubeId}',
              events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
              }
            });
          }

          function onPlayerReady(event) {
            
          }

          function onPlayerStateChange(event) {
            window.ReactNativeWebView.postMessage(event.data);
          }
        </script>
      </body>
    </html>`;
    return {html};
  }, [youTubeId]);

  const onPressPlay = useCallback(() => {
    if (webViewRef.current != null) {
      webViewRef.current.injectJavaScript(`
        player.playVideo(); true;
      `);
    }
  }, [webViewRef]);

  const onPressPause = useCallback(() => {
    if (webViewRef.current != null) {
      webViewRef.current.injectJavaScript(`
        player.pauseVideo(); true;
      `);
    }
  }, [webViewRef]);

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
      <View style={styles.youtubeContainer}>
        {youTubeId.length > 0 && (
          <WebView
            ref={webViewRef}
            source={source}
            scrollEnabled={false}
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            onMessage={event => {
              setPlaying(event.nativeEvent.data === '1');
            }}
          />
        )}
      </View>
      <View style={styles.controller}>
        {playing ? (
          <TouchableOpacity style={styles.playButton} onPress={onPressPause}>
            <Icon name="pause-circle" size={41.67} color="#E5E5EA" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.playButton} onPress={onPressPlay}>
            <Icon name="play-circle" size={39.58} color="#00DDAB" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;
