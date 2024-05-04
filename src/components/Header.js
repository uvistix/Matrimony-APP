import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../themeProvider/ThemeProvider";
import { useAuth } from "../authContext/AuthContext";

const Header = ({ title }) => {
  const navigation = useNavigation();

  const { userData } = useAuth();
  const handleUserProfile = () => {
    navigation.navigate("AccountStack", { screen: "Profile" });
  };

  return (
    <View style={theme.headerContainer}>
      <TouchableOpacity
        onPress={() =>
          userData.profileStatus ? navigation.navigate("Home") : null
        }
      >
        <Image
          source={require("../../assets/favicon.png")}
          style={{ width: 56, height: 33 }}
        />
      </TouchableOpacity>
      <Text style={theme.headerTitle}>{title}</Text>
      <TouchableOpacity
        style={theme.headerIconContainer}
        onPress={userData.profileStatus ? handleUserProfile : null}
      >
        {userData.profileStatus && (
          <Ionicons
            name="person-circle"
            style={theme.iconSecondaryColor}
            size={24}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
