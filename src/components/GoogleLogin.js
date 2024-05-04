import React, { useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { View } from "react-native";
import { auth, db } from "../firebaseConfig/FirebaseConfig";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useAuth } from "../authContext/AuthContext";
import SplashScreen from "./SplashScreen";
import Toast from "react-native-simple-toast";
import PrivacyPolicy from "../data/PrivacyPolicy";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GOOGLE_WEB_CLIENT_ID } from "@env";

const GoogleLogin = ({ acceptedTerms }) => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [privacyPolicyModalVisible, setPrivacyPolicyModalVisible] =
    useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
    });
  }, []);

  const checkSignInStatus = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      const credential = GoogleAuthProvider.credential(userInfo.idToken);
      const userCredential = await auth.signInWithCredential(credential);

      if (userCredential) {
        const userId = userCredential.user.uid;
        const userRef = db.collection("users").doc(userId);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
          setUser(userCredential.user);
        } else {
          await createUserDocument(userRef, userCredential.user);
        }
      }
    } catch (error) {
      Toast.show("Cancelled the login flow", Toast.SHORT);
    }
  };

  const createUserDocument = async (userRef, user) => {
    try {
      const timestamp = new Date();
      const randomPart = Math.floor(100000 + Math.random() * 900000);
      const numericUID = timestamp + randomPart;
      const finalID = `BWBM${String(numericUID).slice(-6)}`;

      await userRef.set({
        number: "",
        email: user.email,
        userType: "user",
        verified: false,
        profileStatus: false,
        uid: user.uid,
        id: finalID,
        createdAt: new Date(),
      });

      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      Toast.show("Error signing up!", Toast.SHORT);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      await checkSignInStatus();
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      handleGoogleSignInError(error.code);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignInError = (errorCode) => {
    switch (errorCode) {
      case statusCodes.SIGN_IN_CANCELLED:
        Toast.show("Cancelled the login flow", Toast.SHORT);
        break;
      case statusCodes.IN_PROGRESS:
        Toast.show("Operation is in progress already", Toast.SHORT);
        break;
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        Toast.show("Play services not available or outdated", Toast.SHORT);
        break;
      default:
        Toast.show("Something went wrong, please try again", Toast.SHORT);
        break;
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <SplashScreen visible={loading} />
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={handleGoogleSignUp}
        disabled={!acceptedTerms}
      />
      <PrivacyPolicy
        modalVisible={privacyPolicyModalVisible}
        closeModal={() => setPrivacyPolicyModalVisible(false)}
      />
    </View>
  );
};
export default GoogleLogin;
