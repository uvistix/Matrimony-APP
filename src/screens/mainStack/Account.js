import React, { useState } from "react";
import { View, Text, Alert, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../authContext/AuthContext";
import theme from "../../themeProvider/ThemeProvider";
import ImagePickerComponent from "../../components/ImagePicker";
import PrivacyPolicy from "../../data/PrivacyPolicy";
import { useSubscription } from "../../authContext/SubscriptionContext";


const Account = () => {
  const { isSubscribed } = useSubscription();
  const navigation = useNavigation();
  const { user, userData, signOut } = useAuth();
  const [privacyPolicyModalVisible, setPrivacyPolicyModalVisible] =
    useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const menuItems = [
    {
      key: "profile",
      label: "Profile",
      icon: "person-circle",
      onPress: handleMenuItemPress,
    },
    {
      key: "contactSupport",
      label: "Support",
      icon: "chatbubbles",
      onPress: handleMenuItemPress,
    },
    {
      key: "FAQs",
      label: "FAQs",
      icon: "help-circle",
      onPress: handleMenuItemPress,
    },
    {
      key: "aboutUs",
      label: "About",
      icon: "information-circle",
      onPress: handleMenuItemPress,
    },
    {
      key: "privacyPolicy",
      label: "Privacy Policy",
      icon: "document",
      onPress: handleMenuItemPress,
    },
  ];

  const handleMenuItemPress = (item) => {
    switch (item.key) {
      case "profile":
        navigation.navigate("AccountStack", { screen: "Profile" });
        break;
      case "contactSupport":
        navigation.navigate("AccountStack", { screen: "Support" });
        break;
      case "FAQs":
        navigation.navigate("AccountStack", { screen: "FAQs" });
        break;
      case "aboutUs":
        navigation.navigate("AccountStack", { screen: "About" });
        break;
      case "privacyPolicy":
        setPrivacyPolicyModalVisible(true);
        break;
      default:
        break;
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      "Confirm Sign Out!",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          onPress: () => signOut(),
        },
      ],
      { cancelable: false }
    );
  };


  const formatSubscriptionExpiry = (expiryDate) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(expiryDate).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  return (
    <View style={theme.mainContainer}>
      <Header title="Account" />
      <View style={theme.card}>
        <View style={[{ flexDirection: "row", alignItems: "center" }]}>
          <View style={[{ flex: 1, flexWrap: "wrap" }]}>
            <ImagePickerComponent
              user={user}
              setProfileImage={setProfileImage}
              theme={theme}
              profileImage={profileImage}
            />
          </View>

          {isSubscribed && (
            <View
              style={[
                {
                  alignItems: "center",
                  flex: 1,
                  flexWrap: "wrap",
                  alignContent: "center",
                },
              ]}
            >
              <Text>Hello</Text>
              <Text
                style={theme.accountProfileName}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {userData.name}
              </Text>
            </View>
          )}
        </View>
        {isSubscribed && (
          <View style={theme.accountProfileContainer}>
            {userData.subscriptionExpiry && (
              <Text style={[theme.text, { textAlign: "center", marginTop: 1 }]}>
                Subscription Ends On:{" "}
                {formatSubscriptionExpiry(userData.subscriptionExpiry)}
              </Text>
            )}
          </View>
        )}
      </View>
      <View style={theme.flexView}>
        <ScrollView showsVerticalScrollIndicator={false} style={theme.card}>
          <View style={[{ marginBottom: 20 }]}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.key}
                onPress={() => handleMenuItemPress(item)}
              >
                <View style={theme.accountMenuItem}>
                  <Ionicons
                    name={item.icon}
                    size={theme.iconPrimarySize}
                    style={theme.accountIcon}
                  />
                  <Text style={theme.accountMenuText}>{item.label}</Text>
                  {!item.renderSwitch && (
                    <Ionicons
                      name="arrow-forward"
                      size={theme.iconPrimarySize}
                      style={theme.accountArrowIcon}
                    />
                  )}
                  {item.renderSwitch && item.renderSwitch()}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View style={theme.signOutContainer}>
          <TouchableOpacity style={theme.signOutButton} onPress={handleSignOut}>
            <Text style={theme.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <PrivacyPolicy
          modalVisible={privacyPolicyModalVisible}
          closeModal={() => setPrivacyPolicyModalVisible(false)}
        />
      </View>
    </View>
  );
};

export default Account;
