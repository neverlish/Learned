import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  PanResponder,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import queryString from 'query-string';
import WebView from 'react-native-webview';

const YT_WIDTH = Dimensions.get('window').width;
const YT_HEIGHT = YT_WIDTH * (9 / 16);

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
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    alignSelf: 'flex-end',
    marginTop: 15,
    marginRight: 20,
    color: '#AEAEB2',
    fontSize: 13,
  },
  seekBarBackground: {
    height: 3,
    backgroundColor: '#D4D4D4',
    pointerEvents: 'box-none',
  },
  seekBarProgress: {
    height: 3,
    backgroundColor: '#00DDA8',
    width: '0%',
    pointerEvents: 'none',
  },
  seekBarThumb: {
    width: 14,
    height: 14,
    borderRadius: 14 / 2,
    backgroundColor: '#00DDA8',
    position: 'absolute',
    top: (-14 + 3) / 2,
  },
  repeat: {
    width: 14,
    height: 14,
    borderRadius: 14 / 2,
    backgroundColor: 'red',
    position: 'absolute',
    top: (-14 + 3) / 2,
  },
});

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};

const App = () => {
  const webViewRef = useRef<WebView | null>(null);
  const seekBarAnimRef = useRef(new Animated.Value(0));
  const [url, setUrl] = useState('');
  const [youTubeId, setYouTubeId] = useState('mNz9MvKylJ4');
  const [playing, setPlaying] = useState(false);
  const [durationInSec, setDurationInSec] = useState(0);
  const [currentTimeInSec, setCurrentTimeInSec] = useState(0);
  const [repeatStartInSec, setRepeatStartInSec] = useState<number | null>(null);
  const [repeatEndInSec, setRepeatEndInSec] = useState<number | null>(null);
  const [repeated, setRepeated] = useState(false);

  const onPressOpenLink = useCallback(() => {
    const {
      query: {v: id},
    } = queryString.parseUrl(url);

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
      <body style="margin: 0; padding: 0;">
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

          function postMessageToRN(type, data) {
            const message = JSON.stringify({ type, data });
            window.ReactNativeWebView.postMessage(message);
          }

          function onPlayerReady(event) {
            postMessageToRN('duration', player.getDuration());
          }

          function onPlayerStateChange(event) {
            postMessageToRN('player-state', event.data);
          }
        </script>
      </body>
    </html>
    `;
    return {html};
  }, [youTubeId]);

  const onPressPlay = useCallback(() => {
    if (webViewRef.current != null) {
      webViewRef.current.injectJavaScript('player.playVideo();');
    }
  }, []);

  const onPressPause = useCallback(() => {
    if (webViewRef.current != null) {
      webViewRef.current.injectJavaScript('player.pauseVideo();');
    }
  }, []);

  const durationText = useMemo(
    () => formatTime(Math.floor(durationInSec)),
    [durationInSec],
  );

  const currentTimeText = useMemo(
    () => formatTime(Math.floor(currentTimeInSec)),
    [currentTimeInSec],
  );

  useEffect(() => {
    if (playing) {
      const id = setInterval(() => {
        if (webViewRef.current != null) {
          webViewRef.current.injectJavaScript(
            "postMessageToRN('current-time', player.getCurrentTime());",
          );
        }
      }, 50);
      return () => {
        clearInterval(id);
      };
    }
  }, [playing]);

  useEffect(() => {
    Animated.timing(seekBarAnimRef.current, {
      toValue: currentTimeInSec,
      duration: 50,
      useNativeDriver: false,
    }).start();
  }, [currentTimeInSec]);

  const durationInSecRef = useRef(durationInSec);
  durationInSecRef.current = durationInSec;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        webViewRef.current?.injectJavaScript('player.pauseVideo();');
      },
      onPanResponderMove: (event, gestureState) => {
        const newTimeInSec =
          (gestureState.moveX / YT_WIDTH) * durationInSecRef.current;
        seekBarAnimRef.current.setValue(newTimeInSec);
      },
      onPanResponderRelease(event, gestureState) {
        const newTimeInSec =
          (gestureState.moveX / YT_WIDTH) * durationInSecRef.current;
        webViewRef.current?.injectJavaScript(
          `player.seekTo(${newTimeInSec}, true);`,
        );
        webViewRef.current?.injectJavaScript('player.playVideo();');
      },
    }),
  ).current;

  const onPressSetRepeatTime = useCallback(() => {
    if (repeatStartInSec == null) {
      setRepeatStartInSec(currentTimeInSec);
    } else if (repeatEndInSec == null) {
      setRepeatEndInSec(currentTimeInSec);
    } else {
      setRepeatStartInSec(null);
      setRepeatEndInSec(null);
    }
  }, [currentTimeInSec, repeatStartInSec, repeatEndInSec]);

  const onPressRepeat = useCallback(() => {
    setRepeated(prev => !prev);
  }, []);

  useEffect(() => {
    if (repeated && repeatStartInSec != null && repeatEndInSec != null) {
      if (currentTimeInSec > repeatEndInSec) {
        webViewRef.current?.injectJavaScript(
          `player.seekTo(${repeatStartInSec}, true);`,
        );
      }
    }
  }, [repeated, currentTimeInSec, repeatStartInSec, repeatEndInSec]);

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
        <TouchableOpacity
          onPress={onPressOpenLink}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Icon name="add-link" size={24} color={'#AEAEB2'} />
        </TouchableOpacity>
      </View>
      <View style={styles.youtubeContainer}>
        {youTubeId.length > 0 && (
          <WebView
            ref={webViewRef}
            source={source}
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            onMessage={event => {
              const {type, data} = JSON.parse(event.nativeEvent.data);
              if (type === 'player-state') {
                setPlaying(data === 1);
              } else if (type === 'duration') {
                setDurationInSec(data);
              } else if (type === 'current-time') {
                setCurrentTimeInSec(data);
              }
            }}
          />
        )}
      </View>
      <View style={styles.seekBarBackground} {...panResponder.panHandlers}>
        <Animated.View
          style={[
            styles.seekBarProgress,
            {
              width: seekBarAnimRef.current.interpolate({
                inputRange: [0, durationInSec],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
        <Animated.View
          style={[
            styles.seekBarThumb,
            {
              left: seekBarAnimRef.current.interpolate({
                inputRange: [0, durationInSec],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
        {repeatStartInSec != null && (
          <View
            style={[
              styles.repeat,
              {left: (repeatStartInSec / durationInSec) * YT_WIDTH},
            ]}
          />
        )}
        {repeatEndInSec != null && (
          <View
            style={[
              styles.repeat,
              {left: (repeatEndInSec / durationInSec) * YT_WIDTH},
            ]}
          />
        )}
      </View>
      <Text
        style={styles.timerText}>{`${currentTimeText} / ${durationText}`}</Text>
      <View style={styles.controller}>
        <TouchableOpacity onPress={onPressSetRepeatTime}>
          <Icon name="data-array" size={28} color="#D9D9D9" />
        </TouchableOpacity>
        {playing ? (
          <TouchableOpacity style={styles.playButton} onPress={onPressPause}>
            <Icon name="pause-circle" size={41.67} color="#E5E5EA" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.playButton} onPress={onPressPlay}>
            <Icon name="play-circle" size={39.58} color="#00DDA8" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onPressRepeat}>
          <Icon
            name="repeat"
            size={28}
            color={repeated ? '#00DDA8' : '#D9D9D9'}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;
