import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { auth } from "../../firebaseConfig/FirebaseConfig";
import theme from "../../themeProvider/ThemeProvider";
import SplashScreen from "../../components/SplashScreen";
import { useNavigation } from "@react-navigation/native";
import { ERROR_MESSAGES } from "../../components/ErrorMessages";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);


  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      // Check if the email is valid
      if (!email || !isValidEmail(email)) {
        Alert.alert("Error", "Please enter a valid email address.");
        return;
      }

      await auth.sendPasswordResetEmail(email);
      Alert.alert("Success!", "Password reset email sent. Check your email.");
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
    <View style={theme.authContainer}>
      <SplashScreen visible={loading} />
      <View style={theme.contentArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={theme.authWelcomeText}>BWB Matrimony</Text>
          <Text style={theme.authSubText}>Perfect Matches Partner</Text>

          <View style={theme.card}>
            <Text style={theme.heading}>Forgot Password ?</Text>

            <TextInput
              style={theme.input}
              placeholder="Email"
              placeholderTextColor={theme.inputPlaceholderColor}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TouchableOpacity
              style={theme.primaryButton}
              onPress={handleResetPassword}
            >
              <Text style={theme.primaryButtonText}>Reset Password</Text>
            </TouchableOpacity>

            <Text style={theme.authCTA}>
              Remembered Password ?{" "}
              <Text
                style={theme.link}
                onPress={() => navigation.navigate("SignIn")}
              >
                Sign In
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
