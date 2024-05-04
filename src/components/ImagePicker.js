import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { storage, db } from "./../firebaseConfig/FirebaseConfig";
import Modal from "react-native-modal";
import ImageViewer from "react-native-image-zoom-viewer";
import { useAuth } from "../authContext/AuthContext";
import SplashScreen from "./SplashScreen";
import Toast from "react-native-simple-toast";

const ImagePickerComponent = ({
  user,
  setProfileImage,
  theme,
  profileImage,
}) => {
  const { userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isZoomModalVisible, setZoomModalVisible] = useState(false);

  useEffect(() => {
    if (userData.profileImage) {
      setProfileImage(userData.profileImage);
    } else {
      setProfileImage(null);
    }
  }, [userData]);

  const toggleZoomModal = () => {
    setZoomModalVisible(!isZoomModalVisible);
  };

  const pickImage = async () => {
    setLoading(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [8, 8],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedImageUri = result.assets[0].uri;

        const response = await fetch(selectedImageUri);
        const blob = await response.blob();

        // Check file size before proceeding
        const fileSize = blob.size;
        const maxFileSize = 1 * 1024 * 1024; // 1 MB

        if (fileSize > maxFileSize) {
          Toast.show(
            "Oops! Maximum image size is 1 MB. Please choose a smaller image.",
            Toast.LONG
          );
          return;
        }

        setProfileImage(selectedImageUri);

        const storageRef = storage.ref().child(`profileImages/${user.uid}`);
        await storageRef.put(blob);
        const imageUrl = await storageRef.getDownloadURL();
        await db
          .collection("users")
          .doc(user.uid)
          .update({ profileImage: imageUrl });
      }
    } catch (error) {
      Toast.show("Error uploading image. Please try again.", Toast.LONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SplashScreen visible={loading} />
      <View style={{ alignItems: "center" }}>
        <View style={{ position: "relative" }}>

        

          {profileImage ? (
            <TouchableOpacity onPress={toggleZoomModal}>
              <Image
                source={{ uri: profileImage }}
                style={theme.accountImage}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={pickImage}>
              <View style={{ alignItems: "center" }}>
                <Ionicons
                  name="person-circle"
                  size={150}
                  color={theme.primaryColor}
                />
              </View>

              <Text>Click to set profile image.</Text>
            </TouchableOpacity>
          )}
            {/* verified badge */}
            <View style={theme.ipVerifiedBadge}>
            {userData.verified && (
              <Ionicons
                name="shield-checkmark-outline"
                size={50}
                color={"green"}
                padding={10}
              />
            )}
          </View>
        </View>
        {profileImage && (
          <TouchableOpacity onPress={pickImage}>
            <Ionicons
              name="camera"
              size={24}
              color={theme.primaryColor}
              style={{ marginTop: -15, marginLeft: 100 }}
            />
          </TouchableOpacity>
        )}
      </View>

      <Modal
        isVisible={isZoomModalVisible}
        onBackdropPress={toggleZoomModal}
        onBackButtonPress={toggleZoomModal}
        style={{ margin: 0 }}
      >
        <ImageViewer
          imageUrls={[{ url: profileImage }]}
          index={0}
          renderIndicator={() => null}
          enableSwipeDown
          onSwipeDown={toggleZoomModal}
          style={{ flex: 1, backgroundColor: "black" }}
        />
      </Modal>
    </>
  );
};

export default ImagePickerComponent;
