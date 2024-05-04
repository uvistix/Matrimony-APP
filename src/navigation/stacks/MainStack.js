import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../screens/mainStack/Home";
import ReceivedRequestsList from "../../screens/mainStack/ReceivedRequestsList";
import Account from "../../screens/mainStack/Account";
import SentRequestsList from "../../screens/mainStack/SentRequestsList";
import SavedProfilesList from "../../screens/mainStack/SavedProfilesList";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../themeProvider/ThemeProvider";
import { useAuth } from "../../authContext/AuthContext";

const Tab = createBottomTabNavigator();

const MainStack = () => {
  const { userData } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.primaryColor,
        // tabBarInactiveTintColor:theme.blackSecondaryColor,
        tabBarLabelStyle: {
          fontSize: 10,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "SentRequestsList") {
            iconName = "arrow-up-circle";
          } else if (route.name === "ReceivedRequestsList") {
            iconName = "arrow-down-circle";
          } else if (route.name === "SavedProfilesList") {
            iconName = "heart";
          } else if (route.name === "Account") {
            iconName = "person";
          }
          const iconSize = 24;
          return <Ionicons name={iconName} color={color} size={iconSize} />;
        },
        tabBarStyle: theme.tabBarStyle,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
        }}
      />
     {userData.userType !== "admin" && (
        <>
          <Tab.Screen
            name="SentRequestsList"
            component={SentRequestsList}
            options={{
              tabBarLabel: "Sent",
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="ReceivedRequestsList"
            component={ReceivedRequestsList}
            options={{
              tabBarLabel: "Received",
              headerShown: false,
            }}
          />
        </>
      )}
      <Tab.Screen
        name="SavedProfilesList"
        component={SavedProfilesList}
        options={{
          tabBarLabel: "Saved",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: "Account",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainStack;
