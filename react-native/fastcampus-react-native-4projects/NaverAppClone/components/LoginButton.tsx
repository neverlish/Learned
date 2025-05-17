import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList, RouteNames} from '../routes';
import CookieManager from '@react-native-cookies/cookies';

type Props = NativeStackNavigationProp<RootStackParamList>;

const LoginButton = () => {
  const navigation = useNavigation<Props>();
  const isFocused = useIsFocused();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const iconName = isLoggedIn ? 'logout' : 'login';
  console.log('isLoggedIn', isLoggedIn);

  useEffect(() => {
    if (isFocused) {
      CookieManager.get('https://.naver.com', true).then(cookie => {
        if (cookie.NID_SES) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
    }
  }, [isFocused]);

  const onPressLogin = useCallback(() => {
    navigation.navigate(RouteNames.LOGIN);
  }, [navigation]);
  const onPressLogout = useCallback(async () => {
    await CookieManager.clearAll(true);
    setIsLoggedIn(false);
  }, []);

  return (
    <TouchableOpacity onPress={isLoggedIn ? onPressLogout : onPressLogin}>
      <MaterialCommunityIcons name={iconName} color="white" size={24} />
    </TouchableOpacity>
  );
};

export default LoginButton;
