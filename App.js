import React from "react";
import AppNavigator from "./src/navigation/Navigation";
import { Provider as PaperProvider } from "react-native-paper";
import { AuthProvider } from "./src/authContext/AuthContext";
import { SubscriptionProvider } from "./src/authContext/SubscriptionContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import theme from "./src/themeProvider/ThemeProvider";
import { usePreventScreenCapture } from 'expo-screen-capture';


function App() {

  usePreventScreenCapture();

  return (
    <SafeAreaView style={theme.flexView}>
      <AuthProvider>
        <SubscriptionProvider>
          <PaperProvider>
            <StatusBar
              barStyle="light-content"
              backgroundColor={theme.statusbarColor}
            />
            <AppNavigator />
          </PaperProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </SafeAreaView>
  );
}

export default App;
