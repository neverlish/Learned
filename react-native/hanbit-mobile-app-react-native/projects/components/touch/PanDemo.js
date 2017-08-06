import React, { Component } from 'react';
import {
  StyleSheet,
  PanResponder,
  View,
  Text
} from 'react-native';

const CIRCLE_SIZE = 40;
const CIRCLE_COLOR = 'blue';
const CIRCLE_HIGHLIGHT_COLOR = 'green';

class PanResponderExample extends Component {
  // 초기 값 지정
  _panResponder = {}
  _previousLeft = 0;
  _previousTop = 0;
  _circleStyles = {}
  circle = null
  
  constructor(props) {
    super(props);
    this.state = {
      numberActiveTouches: 0,
      moveX: 0,
      moveY: 0,
      x0: 0,
      y0: 0,
      dx: 0,
      dy: 0,
      vx: 0,
      vy: 0
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd
    });
    this._previousLeft = 20;
    this._previousTop = 84;
    this._circleStyles ={
      style: {
        left: this._previousLeft,
        top: this._previousTop,
      }
    };
  }

  componentDidMount() {
    this._updatePosition();
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          ref={(circle) => {this.circle = circle;}}
          style={styles.circle}
          {...this._panResponder.panHandlers}/>
        <Text>
          {this.state.numberActiveTouches} touches,
          dx: {this.state.dx},
          dy: {this.state.dy},
          vx: {this.state.vx},
          vy: {this.state.vy},
        </Text>
      </View>
    );
  }

  // _highlight와 _unHighlight는 PanResonder 메서드에 의해 호출되어 사용자에게 시각적 피드백을 주게 된다
  _highLight = () => {
    this.circle && this.circle.setNativeProps({
      style: {
        backgroundColor: CIRCLE_HIGHLIGHT_COLOR
      }
    });
  }

  _unHighLight = () => {
    this.circle && this.circle.setNativeProps({
      style: {
        backgroundColor: CIRCLE_COLOR
      }
    });
  }

  // 원의 위치는 setNativeProps 함수를 통해 변경한다
  _updatePosition = () => {
    this.circle && this.circle.setNativeProps(this._circleStyles);
  }

  _handleStartShouldSetPanResponder = (e: Object, getstureState: Object) => {
    // 사용자가 원을 눌렀을 때 활성화되어야 할까?
    return true;
  }

  _handleMoveShouldSetPanResponder = (e: Object, getstureState: Object) => {
    // 사용자가 터치한 채로 원 위를 지나갈 때 활성회되어야 할까?
    return true;
  }

  _handlePanResponderGrant = (e: Object, getstureState: Object) => {
    this._highLight();
  }

  _handlePanResponderMove = (e: Object, gestureState: Object) => {
    this.setState({
      stateID: gestureState.stateID,
      moveX: gestureState.moveX,
      moveY: gestureState.moveY,
      x0: gestureState.x0,
      y0: gestureState.y0,
      dx: gestureState.dx,
      dy: gestureState.dy,
      vx: gestureState.vx,
      vy: gestureState.vy,
      numberActiveTouches: gestureState.numberActiveTouches
    });

    // dx, dy 를 이용하여 현재 위치를 계산한다
    this._circleStyles.style.left = this._previousLeft + gestureState.dx;
    this._circleStyles.style.top = this._previousTop + gestureState.dy;
    this._updatePosition();
  }

  _handlePanResponderEnd = (e: Object, gestureState: Object) => {
    this._unHighLight();
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
  }
}

const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: CIRCLE_COLOR,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  container: {
    flex: 1,
    paddingTop: 64,
  }
});

export default PanResponderExample;
