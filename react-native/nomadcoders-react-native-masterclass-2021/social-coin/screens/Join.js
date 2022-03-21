import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { BLACK_COLOR } from "../colors";

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
  align-items: center;
  color: white;
  padding: 60px 20px;
`;
const TextInput = styled.TextInput`
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: white;
  background-color: rgba(255, 255, 255, 0.5);
`;
const Btn = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 20px;
  border-width: 1px;
  border-radius: 20px;
  border-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 16px;
`;

const Join = () => {
  const passwordInput = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitEditing = () => {
    passwordInput.current.focus();
  };
  return (
    <Container>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        returnKeyType="next"
        onChangeText={(text) => setEmail(text)}
        onSubmitEditing={onSubmitEditing}
        placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
      />
      <TextInput
        ref={passwordInput}
        placeholder="Password"
        secureTextEntry
        value={password}
        returnKeyType="done"
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
      />
      <Btn>
        <BtnText>Create Account</BtnText>
      </Btn>
    </Container>
  );
};
export default Join;