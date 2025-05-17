import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useCallback } from "react";
import { TouchableOpacity } from "react-native";

const LoginButton = () => {
  const isLoggedIn = false;
  const iconName = isLoggedIn ? "logout" : "login";

  const onPressLogin = useCallback(() => {
    router.navigate({ pathname: "login" });
  }, []);
  const onPressLogout = useCallback(() => {}, []);

  return (
    <TouchableOpacity onPress={isLoggedIn ? onPressLogout : onPressLogin}>
      <MaterialCommunityIcons name={iconName} color="white" size={24} />
    </TouchableOpacity>
  );
};

export default LoginButton;
