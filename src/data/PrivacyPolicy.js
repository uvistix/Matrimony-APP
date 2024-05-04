// PrivacyPolicyModal.js
import React from "react";
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import theme from "../themeProvider/ThemeProvider";

const PrivacyPolicyModal = ({ modalVisible, closeModal }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <ScrollView
        style={theme.flexView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View>
          <View>
            <View style={theme.card}>
              <View style={theme.heroblockImageContainer}>
                <Image
                  source={require("../../assets/privacy-policy.png")}
                  style={theme.heroblockImage}
                />
              </View>
              <Text style={theme.title}>Privacy Policy & Terms Conditions</Text>

              <Text style={theme.pPText}>
                Effective Date: <Text style={theme.pPTitle}>05/01/2024</Text>
              </Text>
              <Text style={theme.pPText}>
                <Text style={theme.pPTitle}>1. Information Collected{" "}:{" "}</Text>
                BWB Matrimony collects personal, educational, professional,
                family, and Kundli details from users for the purpose of
                facilitating connections on the matrimonial platform.
              </Text>
              <Text style={theme.pPText}>
                <Text style={theme.pPTitle}>
                  2. Use of Collected Information{" "}:{" "}
                </Text>
                 User information is displayed to other users within the app to
                enable meaningful connections.
              </Text>
              <Text style={theme.pPText}>
                <Text style={theme.pPTitle}>3. Third-Party Sharing{" "}:{" "}</Text>BWB
                Matrimony does not share user information with any third
                parties.
              </Text>
              <Text style={theme.pPText}>
                <Text style={theme.pPTitle}>4. Subscription Module{" "}:{" "}</Text>
                Subscriptions are renewed every 30 days from the day of
                activation. The subscription, currently free during the trial
                phase, will be subject to payment in the future. Users can
                manually activate their subscription by clicking the designated
                button.
              </Text>
              <Text style={theme.pPText}>
                <Text style={theme.pPTitle}>5. Account Termination{" "}:{" "}</Text>
                Accounts may be terminated for unethical practices, spamming,
                providing false information, abusive behavior, or any other
                violation of the app's policies.
              </Text>
              <Text style={theme.pPText}>
                <Text style={theme.pPTitle}>6. Data Security{" "}:{" "}</Text>User data
                is stored on Google Firebase, a trusted service managed by
                Google, ensuring the security and integrity of the stored
                information.
              </Text>
              <Text style={theme.pPText}>
                <Text style={theme.pPTitle}>7. Cookies{" "}:{" "}</Text>BWB Matrimony
                does not use cookies.
              </Text>
              <Text style={theme.pPText}>
                <Text style={theme.pPTitle}>8. Access to User Details{" "}:{" "}</Text>
                App management has access to all user details. The app
                management reserves the right to share user details with other
                users without the user's explicit consent.
              </Text>
              <Text style={theme.pPText}>
                <Text style={theme.pPTitle}>9. Age Restrictions{" "}:{" "}</Text>Users
                must be a minimum of 21 years (male) or 18 years (female) to use
                BWB Matrimony.
              </Text>
              <Text style={theme.pPText}>
                <Text style={theme.pPTitle}>10. Notification and Updates{" "}:{" "}</Text>
                No notifications will be sent for updates. Users are responsible
                for staying updated by checking the app frequently.
              </Text>
              <Text style={theme.pPText}>
                <Text style={theme.pPTitle}>Modifications{" "}:{" "}</Text>
                BWB Matrimony reserves the right to update this Privacy Policy
                and Terms of Service at any time. Users are encouraged to review
                these policies regularly.
              </Text>
              <Text style={theme.pPText}>
                <Text style={theme.pPTitle}>Termination{" "}:{" "}</Text>
                BWB Matrimony holds the right to terminate any account at its
                discretion.
              </Text>
              <Text style={theme.pPText}>
                <Text style={theme.pPTitle}>Refund Policy{" "}:{" "}</Text>No BWB
                Matrimony does not provide refunds for subscription fees.
              </Text>
              <Text style={theme.pPText}>
                By using BWB Matrimony, you agree to abide by these policies and
                terms. If you do not agree, please refrain from using the app.
              </Text>
              <Text style={theme.pPText}>
                For any inquiries, please contact support@bwbmatrimony.com
              </Text>
              <TouchableOpacity
                onPress={closeModal}
                style={theme.primaryButton}
              >
                <Text style={theme.primaryButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default PrivacyPolicyModal;
