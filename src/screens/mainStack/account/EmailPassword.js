import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import theme from "../../../themeProvider/ThemeProvider";
import SplashScreen from "../../../components/SplashScreen";
import { useAuth } from "../../../authContext/AuthContext";
import { ERROR_MESSAGES } from "../../../components/ErrorMessages";
import { auth } from "../../../firebaseConfig/FirebaseConfig";

const ChangeEmailAndPassword = ({ navigation }) => {
  const { userData, signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    try {
      setLoading(true);

      await auth.sendPasswordResetEmail(userData.email);
      signOut;

      Alert.alert(
        "Success!",
        "Password reset email sent. Check your email and login with new password"
      );
    } catch (error) {
      let errorMessage = ERROR_MESSAGES.general;

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = ERROR_MESSAGES.invalidEmail;
          break;
        case "auth/user-not-found":
          errorMessage = ERROR_MESSAGES.emailNotFound;
          break;
        case "auth/operation-not-allowed":
          errorMessage = ERROR_MESSAGES.operationNotAllowed;
          break;
        case "auth/network-request-failed":
          errorMessage = ERROR_MESSAGES.networkError;
          break;
        default:
          // Handle unexpected errors with a generic message
          errorMessage = ERROR_MESSAGES.general;
          break;
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
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
            <Text style={theme.title}>Reset Password</Text>
            <Text style={[theme.text, { marginVertical: 10 }]}>
              Account Email : {userData.email}
            </Text>

            <TouchableOpacity
              style={theme.primaryButton}
              onPress={handleResetPassword}
            >
              <Text style={theme.primaryButtonText}>Reset Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={theme.secondaryButton}
              onPress={() => {
                navigation.navigate("AccountStack", {
                  screen: "Delete Account",
                });
              }}
            >
              <Text style={theme.secondaryButtonText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ChangeEmailAndPassword;
