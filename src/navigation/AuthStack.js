import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../screens/authStack/SignIn";
import SignUp from "../screens/authStack/SignUp";
import ForgotPassword from "../screens/authStack/ForgotPassword";
import WalkthroughAppConfig from "../screens/onboardingScreens/WalkthroughAppConfig";
import WalkthroughScreen from "../screens/onboardingScreens/WalkthroughScreen";
import { useAuth } from "../authContext/AuthContext";

const Stack = createStackNavigator();

const AuthStack = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Walkthrough"
          component={WalkthroughScreen}
          initialParams={{
            appConfig: WalkthroughAppConfig,
          }}
          options={{ headerShown: false }}
        />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
