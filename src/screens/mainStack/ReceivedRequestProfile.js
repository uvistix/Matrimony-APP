import React, { useState, useEffect} from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import ProfileContent from "./ProfileContent";

const RequestReceivedProfiles = ({ route }) => {
  const { selectedItem, selectedIndex } = route.params;
  const [currentItemIndex] = useState(selectedIndex);
  const [currentItem] = useState(selectedItem[currentItemIndex]?.senderData || null);
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
          source={"requestReceivedProfile"}
        />
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RequestReceivedProfiles;
