import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import ProfileContent from "./ProfileContent";

const SavedProfileDetails = ({ route }) => {
  const { selectedItem, selectedIndex } = route.params;
  const [currentItemIndex] = useState(selectedIndex);
  const [currentItem] = useState(selectedItem[currentItemIndex]?.data || null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    currentItem && setIsLoading(false);
  }, [currentItem]);
  

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={"black"} />
      ) : currentItem ? (
        <ProfileContent
          selectedItem={selectedItem}
          selectedIndex={selectedIndex}
          item={currentItem}
          source={"savedProfile"}
        />
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  modalBlock: {
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 0,
    marginBottom: 16,
  },
  modalContent: {
    marginVertical: 16,
  },
  bottomButtonsContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  requestButton: {
    flexDirection: "row",
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  requestButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  requestIcon: {
    paddingLeft: 20,
  },
});

export default SavedProfileDetails;
