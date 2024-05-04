import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../authContext/AuthContext";
import MainStack from "./stacks/MainStack";
import AccountStack from "./stacks/AccountStack";
import OtherStack from "./stacks/OtherStack";
import AuthStack from "./AuthStack";
import SplashScreen from "../components/SplashScreen";

const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainStack"
        component={MainStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AccountStack"
        component={AccountStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OtherStack"
        component={OtherStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function Navigation() {
  const { user, userData, isLoading } = useAuth();

  let navigationComponent;

  if (isLoading) {
    return <SplashScreen visible={isLoading} />;
  }

  if (user && userData) {
    navigationComponent = <Main />;
  } else {
    navigationComponent = <AuthStack />;
  }

  return <NavigationContainer>{navigationComponent}</NavigationContainer>;
}
