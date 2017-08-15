import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

var _ = require('lodash');
import Video from 'react-native-video';

export default class Depends extends Component {
  constructor() {
    super();
    console.log('Random number: ' + _.random(0, 5))
  }
  render() {
    return (
      <View style={styles.container}>
        <Video
          source={require('./warbler.mp4')} // URL이나 로컬 파일 지정 가능.
          rate={1.0} // 0은 일시 정지, 1은 보통 속도.
          muted={false} // 오디오를 음소거
          pause={false} // 재생을 일시 정지
          resizeMode='cover' // 영상의 가로/세로 비율을 유지함녀서 화면을 가득 채움
          repeat={true} // 무한 반복
          style={styles.backgroundVideo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

