// ProfileRequestButtons.js

import React from "react";
import { View, TouchableOpacity, ActivityIndicator, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileRequestButtons = ({
  handleBack,
  handleForward,
  handleSaveProfile,
  handleRejectRequest,
  handleAcceptRequest,
  isSubscribed,
  currentItemIndex,
  handleCall,
  handleRequest,
  handleRequestAgainCancel,
  handleRequestAgain,
  isLoading,
  theme,
  selectedItem,
  requestsReceivedStatus,
  requestsSentStatus,
  isProfileSaved,
  subscribe,
  userData,
  loading,
}) => {
  const renderLoadingIndicator = () => (
    <ActivityIndicator size="large" color={theme.primaryColor} />
  );

  const renderSubscribeButton = () => (
    <TouchableOpacity onPress={subscribe} style={theme.primaryButtonIcon}>
      <Text style={theme.primaryButtonIconText}>Subscribe for number</Text>
    </TouchableOpacity>
  );

  const renderRequestButtonsPending = () => (
    <>
      <TouchableOpacity
        onPress={handleRejectRequest}
        style={[theme.secondaryButtonIcon, { marginRight: 3 }]}
      >
        <Text style={theme.secondaryButtonIconText}>Reject</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleAcceptRequest}
        style={[theme.primaryButtonIcon, { marginLeft: 3 }]}
      >
        <Text style={theme.primaryButtonIconText}>Accept</Text>
      </TouchableOpacity>
    </>
  );

  const renderRequestButtonsAccepted = () => (
    <TouchableOpacity onPress={handleCall} style={theme.primaryButtonIcon}>
      <Text style={theme.primaryButtonIconText}>Call Now</Text>
      <Ionicons
        name={"call"}
        size={theme.iconPrimarySize}
        style={theme.iconSecondaryColor}
      />
    </TouchableOpacity>
  );

  const RequestAgainButton = () => (
    <TouchableOpacity
      onPress={handleRequestAgain}
      style={theme.primaryButtonIcon}
    >
      <Text style={theme.primaryButtonIconText}>Request Again</Text>
      <Ionicons
        name={"call"}
        size={theme.iconPrimarySize}
        style={theme.iconSecondaryColor}
      />
    </TouchableOpacity>
  );

  const CancelRequestAgainButton = () => (
    <TouchableOpacity
      onPress={handleRequestAgainCancel}
      style={theme.secondaryButtonIcon}
    >
      <Text style={theme.secondaryButtonIconText}>Cancel Request Again</Text>
      <Ionicons
        name="close-circle"
        size={theme.iconPrimarySize}
        style={theme.iconPrimaryColor}
      />
    </TouchableOpacity>
  );

  const RequestNumberButton = () => (
    <TouchableOpacity onPress={handleRequest} style={theme.primaryButtonIcon}>
      <Text style={theme.primaryButtonIconText}>Request Number</Text>
      <Ionicons
        name={"call"}
        size={theme.iconPrimarySize}
        style={theme.iconSecondaryColor}
      />
    </TouchableOpacity>
  );

  const CancelRequestSentButton = () => (
    <TouchableOpacity onPress={handleRequest} style={theme.secondaryButtonIcon}>
      <Text style={theme.secondaryButtonIconText}>Cancel Request</Text>
      <Ionicons
        name="close-circle"
        size={theme.iconPrimarySize}
        style={theme.iconPrimaryColor}
      />
    </TouchableOpacity>
  );

  const renderRequestButtons = () => {
    if (!isSubscribed) {
      return renderSubscribeButton();
    }
    if (
      requestsReceivedStatus === "request pending" ||
      requestsReceivedStatus === "requested again"
    ) {
      return renderRequestButtonsPending();
    } else if (
      requestsSentStatus === "request accepted" ||
      requestsReceivedStatus === "request accepted" ||
      userData.userType === "admin"
    ) {
      return renderRequestButtonsAccepted();
    } else if (requestsSentStatus === "request rejected") {
      return RequestAgainButton();
    } else if (requestsSentStatus === "requested again") {
      return CancelRequestAgainButton();
    } else if (requestsSentStatus === "request pending") {
      return CancelRequestSentButton();
    } else {
      return RequestNumberButton();
    }
  };

  return (
    <View style={theme.bottomButtonsContainer}>
      <TouchableOpacity onPress={handleBack} disabled={currentItemIndex === 0}>
        <Ionicons
          name="chevron-back-circle"
          size={40}
          style={
            currentItemIndex === 0
              ? theme.iconDisabledColor
              : theme.iconPrimaryColor
          }
        />
      </TouchableOpacity>
      {isLoading || loading? (
        renderLoadingIndicator()
      ) : (
        <>
          <View style={{ flexDirection: "row" }}>{renderRequestButtons()}</View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={handleSaveProfile}>
              <Ionicons
                name={isProfileSaved ? "heart" : "heart-outline"}
                size={40}
                style={theme.iconPrimaryColor}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
      <TouchableOpacity
        onPress={handleForward}
        disabled={currentItemIndex === selectedItem.length - 1}
      >
        <Ionicons
          name="chevron-forward-circle"
          size={40}
          style={
            currentItemIndex === selectedItem.length - 1
              ? theme.iconDisabledColor
              : theme.iconPrimaryColor
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileRequestButtons;
