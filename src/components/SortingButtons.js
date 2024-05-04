import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../themeProvider/ThemeProvider";

const SortingButtons = ({ sortCriteria, setSortCriteria }) => {
 

  const buttons = [
    { label: "all", icon: "list-circle", name: "All" },
    { label: "request pending", icon: "hourglass", name: "Pending" },
    {
      label: "request accepted",
      icon: "checkmark-done-circle",
      name: "Accepted",
    },
    { label: "request rejected", icon: "close-circle", name: "Rejected" },
    { label: "requested again", icon: "reload-circle", name: "Req. Again" },
  ];

  return (
    <View style={theme.sortingButtonContainer}>
      {buttons.map((button) => (
        <TouchableOpacity
          key={button.label}
          accessibilityLabel={button.label}
          style={[
            theme.sortingButton,
            sortCriteria === button.label && theme.sortingActiveButton,
          ]}
          onPress={() => setSortCriteria(button.label)}
        >
          <Ionicons
            name={button.icon}
            size={24}
            color={"green"}
            style={[
              sortCriteria === button.label
                ? theme.iconSecondaryColor
                : theme.iconPrimaryColor,
              theme.sortingIcon,
            ]}
          />
          <Text
            style={[
              sortCriteria === button.label
                ? theme.iconSecondaryColor
                : theme.primaryColor,
              theme.sortingIconText,
            ]}
          >
            {button.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SortingButtons;
