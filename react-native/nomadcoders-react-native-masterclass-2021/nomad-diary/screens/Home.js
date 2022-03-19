import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";

const View = styled.View`
  flex: 1;
  padding: 0px 30px;
  padding-top: 100px;
  background-color: ${colors.bgColor};
`;
const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 38px;
  font-weight: 500;
  margin-bottom: 100px;
`;
const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 50px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.btnColor};
  elevation: 5;
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;

const Home = ({ navigation: { navigate } }) => (
  <View>
    <Title>My journal</Title>
    <Btn onPress={() => navigate("Write")}>
      <Ionicons name="add" color="white" size={40} />
    </Btn>
  </View>
);
export default Home;