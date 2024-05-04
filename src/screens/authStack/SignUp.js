import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import theme from "../../themeProvider/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../firebaseConfig/FirebaseConfig";
import PrivacyPolicy from "../../data/PrivacyPolicy";
import SplashScreen from "../../components/SplashScreen";
import { ERROR_MESSAGES } from "../../components/ErrorMessages";
import GoogleLogin from "../../components/GoogleLogin";

export default function SignUp() {
  const [number, setNumber] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [privacyPolicyModalVisible, setPrivacyPolicyModalVisible] =
    useState(false);
  const navigation = useNavigation();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateSignUpForm = () => {
    if (!number || number.length <= 9) {
      return Alert.alert("Error!", "Please enter a valid number!");
    }

    if (!email || !isValidEmail(email)) {
      return Alert.alert("Error!", "Please enter a valid email!");
    }

    if (!password || password.length <= 5) {
      return Alert.alert(
        "Error!",
        "Please enter a minimum 6 characters password!"
      );
    }

    if (!acceptedTerms) {
      return Alert.alert("Error!", "Please accept the terms and conditions.");
    }

    handleSignUp();
  };

  const handleSignUp = async () => {
    setLoading(true);

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      await user.sendEmailVerification();

      const timestamp = new Date();
      const randomPart = Math.floor(100000 + Math.random() * 900000);
      const numericUID = timestamp + randomPart;
      const newNumericUID = String(numericUID).slice(-6);
      const finalID = `BWBM${newNumericUID}`;

      await db.collection("users").doc(user.uid).set({
        number,
        email,
        userType: "user",
        verified: false,
        profileStatus: false,
        uid: user.uid,
        id: finalID,
        createdAt: new Date(),
      });

      Alert.alert(
        "Success! Account created successfully",
        "Please check your email for verification and sign in back."
      );
      setNumber("");
      setEmail("");
      setPassword("");

      setLoading(false);
      navigation.navigate("SignIn");
    } catch (error) {
      let errorMessage = ERROR_MESSAGES.general;

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = ERROR_MESSAGES.emailInUse;
          break;
        case "auth/invalid-email":
          errorMessage = ERROR_MESSAGES.invalidEmail;
          break;
        case "auth/operation-not-allowed":
          errorMessage = ERROR_MESSAGES.operationNotAllowed;
          break;
        case "auth/weak-password":
          errorMessage = ERROR_MESSAGES.weakPassword;
          break;
        case "auth/network-request-failed":
          errorMessage = ERROR_MESSAGES.networkError;
          break;
        default:
          // Handle unexpected errors with a generic message
          errorMessage = ERROR_MESSAGES.general;
          break;
      }

      setLoading(false);
      Alert.alert("Error", errorMessage);
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
            <Text style={theme.heading}>Sign Up</Text>

            <TextInput
              placeholder="Number"
              placeholderTextColor={theme.inputPlaceholderColor}
              style={theme.input}
              value={number}
              onChangeText={(text) => {
                if (/^\d*$/.test(text)) {
                  setNumber(text);
                }
              }}
              keyboardType="numeric"
              autoCompleteType="off"
              autoCapitalize="none"
              textContentType="telephoneNumber"
              accessible={true}
              accessibilityLabel="Number"
              maxLength={10} // Set the maximum character limit
            />

            <TextInput
              placeholder="Email"
              placeholderTextColor={theme.inputPlaceholderColor}
              style={theme.input}
              value={email}
              onChangeText={setEmail}
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
              onPress={() => setAcceptedTerms(!acceptedTerms)}
              style={theme.checkbox}
            >
              <Ionicons
                name={acceptedTerms ? "checkbox-outline" : "square-outline"}
                size={20}
                color={theme.primaryColor}
              />

              <Text style={{ marginLeft: 5 }}>
                Accept{" "}
                <Text
                  style={theme.link}
                  onPress={() => setPrivacyPolicyModalVisible(true)}
                >
                  Terms & Conditions
                </Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={theme.primaryButton}
              onPress={!loading ? validateSignUpForm : null}
            >
              <Text style={theme.primaryButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <GoogleLogin acceptedTerms={acceptedTerms}/>
            
            <PrivacyPolicy
              modalVisible={privacyPolicyModalVisible}
              closeModal={() => setPrivacyPolicyModalVisible(false)}
            />

            <Text style={theme.authCTA}>
              Already have an account ?{" "}
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
