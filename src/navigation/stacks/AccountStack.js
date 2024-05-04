import { createStackNavigator } from "@react-navigation/stack";
import UserProfile from "../../screens/mainStack/account/UserProfile";
import ContactUs from "../../screens/mainStack/account/ContactUs";
import EmailPassword from "../../screens/mainStack/account/EmailPassword";
import DeleteAccount from "../../screens/mainStack/account/DeleteAccount";
import TicketsHistory from "../../screens/mainStack/account/TicketsHistory";
import ProfileEdit from "../../screens/mainStack/account/UserProfileEdit";
import About from "../../screens/mainStack/account/About";
import FAQs from "../../screens/mainStack/account/Faqs";
import theme from "../../themeProvider/ThemeProvider";

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
        name="Profile"
        component={UserProfile}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Support"
        component={ContactUs}
        //   options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FAQs"
        component={FAQs}
        //   options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About"
        component={About}
        //   options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Email Password"
        component={EmailPassword}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Delete Account"
        component={DeleteAccount}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
       name="Tickets History"
        component={TicketsHistory}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
