import React, { useState } from "react";
import { View } from "react-native";
import ProfileContent from "./ProfileContent";

const ProfileDetails = ({ route }) => {
  const { selectedItem, selectedIndex } = route.params;
  const [currentItem] = useState(selectedItem[selectedIndex]);

  return (
    <View>
      <View >
        <ProfileContent
          selectedItem={selectedItem}
          selectedIndex={selectedIndex}
          item={currentItem}
          source={"profileDetails"}
        />
      </View>
    </View>
  );
};

export default ProfileDetails;
