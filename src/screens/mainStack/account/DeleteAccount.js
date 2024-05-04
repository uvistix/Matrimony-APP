import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useAuth } from "../../../authContext/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../../themeProvider/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import SplashScreen from "../../../components/SplashScreen";
import { db } from "../../../firebaseConfig/FirebaseConfig";
import { ERROR_MESSAGES } from "../../../components/ErrorMessages";
import { auth } from "../../../firebaseConfig/FirebaseConfig";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GOOGLE_WEB_CLIENT_ID } from "@env";

const DeleteAccountScreen = () => {
  const { userData, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [selectedReason, setSelectedReason] = useState(null);
  const [otherReason, setOtherReason] = useState("");
  const user = auth.currentUser;

  useEffect(() => {
    setOtherReason("");
  }, [selectedReason]);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
    });
  }, []);

  const handleDeleteAccount = async () => {
    if (user) {
      try {
        if (!selectedReason) {
          Alert.alert("Missing Information", "Please select a reason.");
          return;
        }
        if (selectedReason === "Other" && !otherReason) {
          Alert.alert("Missing Information", "Please specify reason");
          return;
        }

        const confirmed = await showConfirmationDialog();

        if (confirmed) {
          setLoading(true);

          const userId = userData.uid;
          await db.collection("deleted_accounts").add({
            ...userData,
            deletionReason: otherReason ? otherReason : selectedReason,
            deletionTime: new Date(),
          });
          await db.collection("users").doc(userId).delete();
          await deleteRelatedDocuments(userId);
          await user.delete();
          await signOut();
          Alert.alert(
            "We miss you",
            "Your account has been successfully deleted."
          );
        }
      } catch (error) {
        let errorMessage = ERROR_MESSAGES.general;

        switch (error.code) {
          case "auth/requires-recent-login":
            errorMessage = ERROR_MESSAGES.requiresRecentLogin;
            break;
          case "auth/network-request-failed":
            errorMessage = ERROR_MESSAGES.networkError;
            break;
          case "auth/invalid-credential":
            errorMessage = ERROR_MESSAGES.authenticationError;
            break;
          case "auth/wrong-password":
            errorMessage = ERROR_MESSAGES.authenticationError;
            break;
          case "auth/network-request-failed":
            errorMessage = ERROR_MESSAGES.networkError;
            break;
          case "auth/too-many-requests":
            errorMessage = ERROR_MESSAGES.tooManyRequests;
            break;
          case "auth/operation-not-allowed":
            errorMessage = ERROR_MESSAGES.operationNotAllowed;
            break;
          default:
            errorMessage = ERROR_MESSAGES.general;
            break;
        }

        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert(
        "Sign In Again",
        "For security reasons, please sign in again to delete the account",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Sign Out",
            onPress: () => {
              signOut();
            },
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    }
  };

  const showConfirmationDialog = () => {
    return new Promise((resolve) => {
      Alert.alert(
        "Delete Account",
        "Are you sure you want to delete your account? This action cannot be undone.",
        [
          { text: "Cancel", onPress: () => resolve(false), style: "cancel" },
          {
            text: "Delete",
            onPress: () => resolve(true),
            style: "destructive",
          },
        ]
      );
    });
  };

  const deleteRelatedDocuments = async (userId) => {
    try {
      const batch = db.batch();

      // Delete documents in contactRequests where userId appears as senderId or receiverId
      const contactRequestsSnapshot = await db
        .collection("contactRequests")
        .where("senderId", "==", userId)
        .get();
      contactRequestsSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      const receivedContactRequestsSnapshot = await db
        .collection("contactRequests")
        .where("receiverId", "==", userId)
        .get();
      receivedContactRequestsSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Delete documents in savedProfiles where userId appears as senderId or receiverId
      const savedProfilesSnapshot = await db
        .collection("savedProfiles")
        .where("senderId", "==", userId)
        .get();
      savedProfilesSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      const receivedSavedProfilesSnapshot = await db
        .collection("savedProfiles")
        .where("receiverId", "==", userId)
        .get();
      receivedSavedProfilesSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Commit the batched writes
      await batch.commit();
    } catch (error) {
      console.error("Error deleting related documents:", error);
    }
  };

  return (
    <View style={theme.mainContainer}>
      <SplashScreen visible={loading} />
      <View style={theme.flexView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={theme.card}>
            <View style={theme.heroblockImageContainer}>
              <Image
                source={require("../../../../assets/email-password.png")}
                style={theme.heroblockImage}
              />
            </View>
            <Text style={theme.title}>Delete Account</Text>
            {user && (
              <>
                <View style={theme.dropDownInput}>
                  <RNPickerSelect
                    placeholder={{
                      label: "Select a reason for deletion",
                      value: null,
                    }}
                    onValueChange={(value) => setSelectedReason(value)}
                    items={[
                      { label: "Found a Match", value: "Found a Match" },
                      {
                        label: "Met Someone Outside the App",
                        value: "Met Someone Outside the App",
                      },
                      {
                        label: "App Experience Issues",
                        value: "App Experience Issues",
                      },
                      { label: "Other (specify reason)", value: "Other" },
                    ]}
                    style={{
                      iconContainer: {
                        top: 10,
                        right: 12,
                      },
                    }}
                    value={selectedReason}
                    useNativeAndroidPickerStyle={false}
                    textInputProps={{ underlineColor: "yellow" }}
                    Icon={() => (
                      <Ionicons
                        name="caret-down" // Adjust the icon name as per your preference
                        size={15}
                        color="gray"
                      />
                    )}
                  />
                </View>
                {selectedReason === "Other" && (
                  <TextInput
                    style={theme.input}
                    placeholder="Specify reason"
                    placeholderTextColor={theme.inputPlaceholderText}
                    value={otherReason}
                    onChangeText={setOtherReason}
                  />
                )}
              </>
            )}
            <TouchableOpacity
              style={theme.primaryButton}
              onPress={handleDeleteAccount}
              disabled={loading}
            >
              <Text style={theme.primaryButtonText}>Delete Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={theme.secondaryButton}
              onPress={() => {
                navigation.navigate("AccountStack", {
                  screen: "Email Password",
                });
              }}
            >
              <Text style={theme.secondaryButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DeleteAccountScreen;
