import { Camera, CameraType, FlashMode } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Slider from "@react-native-community/slider";
import { NavigationProp } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Actions = styled.View`
  flex: 0.35;
  padding: 0px 50px;
  align-items: center;
  justify-content: space-around;
`;

const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
`;

const SliderContainer = styled.View``;
const ActionsContainer = styled.View`
  flex-direction: row;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;

export default function TakePhoto({ navigation }: { navigation: NavigationProp<any> }) {
  const [ok, setOk] = useState(false);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const getPermissions = async () => {
    const { granted } = await Camera.requestPermissionsAsync();
    setOk(granted);
  };
  useEffect(() => {
    getPermissions();
  }, []);
  const onCameraSwitch = () => {
    if (cameraType === CameraType.front) {
      setCameraType(CameraType.back);
    } else {
      setCameraType(CameraType.front);
    }
  };
  const onZoomValueChange = (e: number) => {
    setZoom(e);
  };
  const onFlashChange = () => {
    if (flashMode === FlashMode.off) {
      setFlashMode(FlashMode.on);
    } else if (flashMode === FlashMode.on) {
      setFlashMode(FlashMode.auto);
    } else if (flashMode === FlashMode.auto) {
      setFlashMode(FlashMode.off);
    }
  };
  return (
    <Container>
      <StatusBar hidden={true} />
      <Camera
        type={cameraType}
        style={{ flex: 1 }}
        zoom={zoom}
        flashMode={flashMode}
      >
        <CloseButton onPress={() => navigation.navigate("Tabs")}>
          <Ionicons name="close" color="white" size={30} />
        </CloseButton>
      </Camera>
      <Actions>
        <SliderContainer>
          <Slider
            style={{ width: 200, height: 20 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
            onValueChange={onZoomValueChange}
          />
        </SliderContainer>
        <ButtonsContainer>
          <TakePhotoBtn />
          <ActionsContainer>
            <TouchableOpacity
              onPress={onFlashChange}
              style={{ marginRight: 30 }}
            >
              <Ionicons
                size={30}
                color="white"
                name={
                  flashMode === FlashMode.off
                    ? "flash-off"
                    : flashMode === FlashMode.on
                    ? "flash"
                    : flashMode === FlashMode.auto
                    ? "eye"
                    : undefined
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onCameraSwitch}>
              <Ionicons
                size={30}
                color="white"
                name={
                  cameraType === CameraType.front
                    ? "camera-reverse"
                    : "camera"
                }
              />
            </TouchableOpacity>
          </ActionsContainer>
        </ButtonsContainer>
      </Actions>
    </Container>
  );
}