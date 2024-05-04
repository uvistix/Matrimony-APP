import { createStackNavigator } from "@react-navigation/stack";
import theme from "../../themeProvider/ThemeProvider";
import ProfileDetails from "../../screens/mainStack/ProfileDetails";
import ReceivedRequestProfile from "../../screens/mainStack/ReceivedRequestProfile";
import SentRequestProfile from "../../screens/mainStack/SentRequestProfile";
import SavedProfile from "../../screens/mainStack/SavedProfile";

const Stack = createStackNavigator();

const AccountStack = () => {
 

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.primaryColor, // Set the header background color
        },
        headerTintColor: theme.secondaryColor, // Set the text color of the header
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Profile Details"
        component={ProfileDetails}
        //   options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Received Request Profile"
        component={ReceivedRequestProfile}
        //   options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Sent Request Profile"
        component={SentRequestProfile}
          // options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="Saved Profile"
        component={SavedProfile}
        //   options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
