import React, { useState, useEffect} from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import ProfileContent from "./ProfileContent";

const RequestSentProfiles = ({ route }) => {
  const { selectedItem, selectedIndex } = route.params;
  const [currentItemIndex] = useState(selectedIndex);
  const [currentItem] = useState(selectedItem[currentItemIndex]?.receiverData || null);
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
          source={"requestSentProfile"}
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

export default RequestSentProfiles;
