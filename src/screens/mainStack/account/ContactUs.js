import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import theme from "../../../themeProvider/ThemeProvider";
import { db } from "../../../firebaseConfig/FirebaseConfig";
import { useAuth } from "../../../authContext/AuthContext";
import { useNavigation } from "@react-navigation/native";
import SplashScreen from "../../../components/SplashScreen";

const ContactUs = () => {
  const { userData } = useAuth();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);



  const navigation = useNavigation();
  const handleSubmit = async () => {
    try {
      if (!subject || !message) {
        return Alert.alert("Error!", "Subject and Message are required.");
      }
      setLoading(true);

      // Get user data
      const name = userData.name ?? "";
      const number = userData.number ?? "";
      const email = userData.email ?? "";
      const uid = userData.uid ?? "";
      const id = userData.id ?? "";

      const generateUniqueShortNumericId = () => {
        const timestamp = Date.now();
        const randomComponent = Math.floor(Math.random() * 10000); // Adjust the range as needed
        const uniqueId = `${timestamp}${randomComponent}`.slice(0, 10); // Combine and limit to 10 digits
        return uniqueId;
      };

      // Add form data to Firestore without ticketId
      const formData = {
        name,
        number,
        email,
        uid,
        id,
        subject,
        message,
        status: "Pending",
        response: "",
        timestamp: new Date(),
        ticketId: generateUniqueShortNumericId(),
      };

      await db.collection("contactForms").add(formData);

      Alert.alert(
        "Success!",
        `Form submitted successfully, we will get in touch soon. Ticket ID: #${formData.ticketId}`
      );

      // Optionally, you can reset the form fields after submission
      setSubject("");
      setMessage("");
    } catch (error) {
      Alert.alert(
        "Error submission!",
        "Something went wrong while submitting the form, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={theme.mainContainer}>
      <SplashScreen visible={loading} />
      <View style={theme.flexView}>
        <ScrollView  keyboardShouldPersistTaps="handled">
          <View>
            <View style={theme.card}>
              <View style={theme.heroblockImageContainer}>
                <Image
                  source={require("../../../../assets/support.png")}
                  style={theme.heroblockImage}
                />
              </View>
              <Text style={theme.title}>Contact Us</Text>
              <TextInput
                style={theme.input}
                placeholderTextColor={theme.inputPlaceholderColor}
                placeholder="Subject"
                value={subject}
                onChangeText={(text) => setSubject(text)}
              />
              <TextInput
                style={[theme.input, { height: 150 }]}
                placeholderTextColor={theme.inputPlaceholderColor}
                placeholder="Message"
                multiline
                value={message}
                onChangeText={(text) => setMessage(text)}
              />
              <TouchableOpacity
                style={theme.primaryButton}
                onPress={handleSubmit}
              >
                <Text style={theme.primaryButtonText}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={theme.secondaryButton}
                onPress={() => navigation.navigate("Tickets History")}
              >
                <Text style={theme.secondaryButtonText}>Recent Tickets</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ContactUs;
