import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, PanResponder, Text, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import icons from "./icons";

const BLACK_COLOR = "#1e272e";
const GREY = "#485460";
const GREEN = "#2ecc71";
const RED = "#e74c3c";

const Container = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
`;

const Edge = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const WordContainer = styled(Animated.createAnimatedComponent(View))`
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${GREY};
  border-radius: 50px;
`;
const Word = styled.Text`
  font-size: 38px;
  font-weight: 500;
  color: ${(props) => props.color};
`;
const Center = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
const IconCard = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  padding: 10px 20px;
  border-radius: 10px;
  z-index: 10;
  position: absolute;
`;

export default function App() {
  // Values
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scaleOne = position.y.interpolate({
    inputRange: [-300, -80],
    outputRange: [2, 1],
    extrapolate: "clamp",
  });
  const scaleTwo = position.y.interpolate({
    inputRange: [80, 300],
    outputRange: [1, 2],
    extrapolate: "clamp",
  });
  // Animations
  const onPressIn = Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: true,
  });
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goHome = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });
  const onDropScale = Animated.timing(scale, {
    toValue: 0,
    duration: 50,
    easing: Easing.linear,
    useNativeDriver: true,
  });
  const onDropOpacity = Animated.timing(opacity, {
    toValue: 0,
    duration: 50,
    easing: Easing.linear,
    useNativeDriver: true,
  });
  // Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy }) => {
        console.log(dy);
        position.setValue({ x: dx, y: dy });
      },
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderRelease: (_, { dy }) => {
        if (dy < -250 || dy > 250) {
          Animated.sequence([
            Animated.parallel([onDropScale, onDropOpacity]),
            Animated.timing(position, {
              toValue: 0,
              duration: 50,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]).start(nextIcon);
        } else {
          Animated.parallel([onPressOut, goHome]).start();
        }
      },
    })
  ).current;
  // State
  const [index, setIndex] = useState(0);
  const nextIcon = () => {
    setIndex((prev) => prev + 1);
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
      Animated.spring(opacity, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };
  return (
    <Container>
      <Edge>
        <WordContainer style={{ transform: [{ scale: scaleOne }] }}>
          <Word color={GREEN}>알아</Word>
        </WordContainer>
      </Edge>
      <Center>
        <IconCard
          {...panResponder.panHandlers}
          style={{
            opacity,
            transform: [...position.getTranslateTransform(), { scale }],
          }}
        >
          <Ionicons name={icons[index]} color={GREY} size={76} />
        </IconCard>
      </Center>
      <Edge>
        <WordContainer style={{ transform: [{ scale: scaleTwo }] }}>
          <Word color={RED}>몰라</Word>
        </WordContainer>
      </Edge>
    </Container>
  );
}