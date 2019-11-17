import { createStackNavigator, createAppContainer } from 'react-navigation';
import Signup from "../screens/Auth/Signup";
import Confirm from "../screens/Auth/Confirm";
import Login from "../screens/Auth/Login";
import AuthHome from "../screens/Auth/AuthHome";

const AuthNavigation = createStackNavigator(
  {
    Signup,
    Login,
    Confirm,
    AuthHome,
  },
  {
    headerMode: 'none'
  }
);

export default createAppContainer(AuthNavigation);