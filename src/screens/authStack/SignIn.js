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
import { Ionicons } from "@expo/vector-icons";
import SplashScreen from "../../components/SplashScreen";
import { ERROR_MESSAGES } from "../../components/ErrorMessages";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../authContext/AuthContext";
import GoogleLogin from "../../components/GoogleLogin";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { setUser, storeUserDataLocally } = useAuth();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateSignInForm = async () => {
    if (!email || !isValidEmail(email) || !password || password.length <= 5) {
      return Alert.alert("Error!", "Invalid email or password.");
    }
    setLoading(true);
    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );

      if (userCredential) {
        const user = userCredential.user;

        if (user && user.emailVerified) {
          try {
            await storeUserDataLocally(user);
            setUser(user);
          } catch (error) {
            console.error("Error storing user data locally:", error);
          }
        } else {
          Alert.alert(
            "Error",
            "Invalid email. Please verify your email before logging in.",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Get Verification Email",
                onPress: () => handleEmailVerification(user),
              },
            ]
          );
        }
      }
    } catch (error) {
      let errorMessage = ERROR_MESSAGES.general;

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = ERROR_MESSAGES.invalidEmail;
          break;
        case "auth/invalid-credential":
          errorMessage = ERROR_MESSAGES.authenticationError;
          break;
        case "auth/user-disabled":
          errorMessage = ERROR_MESSAGES.userDisabled;
          break;
        case "auth/user-not-found":
          errorMessage = ERROR_MESSAGES.emailNotFound;
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
  };

  const handleEmailVerification = async (user) => {
    try {
      setLoading(true);
      await user.sendEmailVerification();
      Alert.alert(
        "Email Verification Sent",
        "A verification email has been sent to your registered email address. Please check your inbox and follow the instructions to verify your email. Once verified, you can sign in to your account. Thank you!"
      );
    } catch (error) {
      let errorMessage = ERROR_MESSAGES.general;

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = ERROR_MESSAGES.invalidEmail;
          break;
        case "auth/user-disabled":
          errorMessage = ERROR_MESSAGES.userDisabled;
          break;
        case "auth/user-not-found":
          errorMessage = ERROR_MESSAGES.emailNotFound;
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
            <Text style={theme.heading}>Sign In</Text>
            <TextInput
              placeholder="Email"
              placeholderTextColor={theme.inputPlaceholderColor}
              value={email}
              onChangeText={setEmail}
              style={theme.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              accessible={true}
              accessibilityLabel="Email"
            />
            <View style={theme.inputPasswordContainer}>
              <TextInput
                placeholder="Password"
                placeholderTextColor={theme.inputPlaceholderColor}
                value={password}
                onChangeText={setPassword}
                style={theme.input}
                secureTextEntry={!showPassword}
                textContentType="password"
                accessible={true}
                accessibilityLabel="Password"
              />
              <TouchableOpacity
                style={theme.passwordEyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color={theme.inputPlaceholderColor}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={theme.forgotPassword}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={theme.link}>Forgot Password ?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={theme.primaryButton}
              onPress={validateSignInForm}
            >
              <Text style={theme.primaryButtonText}>Sign In</Text>
            </TouchableOpacity>
            
            <GoogleLogin acceptedTerms={true}/>
            
            <Text style={theme.authCTA}>
              Don't have an account ?{" "}
              <Text
                style={theme.link}
                onPress={() => navigation.navigate("SignUp")}
              >
                Sign Up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
