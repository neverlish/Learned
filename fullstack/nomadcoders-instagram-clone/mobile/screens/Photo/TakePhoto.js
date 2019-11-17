import { Camera } from "expo";
import * as Permissions from "expo-permissions";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "../../components/Loader";
import constants from "../../constants";

const View = styled.View`
  flex: 1;
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === 'granted') {
        setHasPermission(true);
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    askPermission();
  }, [])

  return (
    <View>
      {loading ? (
        <Loader />
      ) : hasPermission ? (
        <Camera
          style={{ width: constants.width, height: constants.height / 2 }}
        />
      ) : null}
    </View>
  );
};