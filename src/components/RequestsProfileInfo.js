// RequestsProfileInfo.js
import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { calculateAge, mapHeightToString, requestStatus } from "../utils/utils"

const RequestsProfileInfo = ({ userData, status, theme }) => {
  return (
    <>
      {/* Left Column */}
      <View style={{ position: "relative" }}>
        {userData.profileImage ? (
          <Image
            source={{ uri: userData.profileImage }}
            style={theme.requestImage}
          />
        ) : (
          <Ionicons
            name="person-circle"
            size={125}
            color={theme.primaryColor}
          />
        )}
        <View style={theme.homeVerifiedBadge}>
          {/* verified badge */}
          {userData.verified && (
            <Ionicons
              name="shield-checkmark-outline"
              size={25}
              color={"green"}
              padding={10}
            />
          )}
        </View>
      </View>

      {/* Right Column */}
      <View style={{ marginLeft: 10, flex: 1 }}>
        {requestStatus(status, userData.id)}

        <Text style={theme.requestsProfileTitle}>{userData.name}</Text>

        {userData.dobYear && userData.height ? (
          <Text numberOfLines={1} ellipsizeMode="tail">
            {calculateAge(userData.dobYear)} Yrs,{" "}{mapHeightToString(parseInt(userData.height))}
          </Text>
        ) : null}
        {userData.education ? (
          <Text numberOfLines={1} ellipsizeMode="tail">
            {userData.education}
          </Text>
        ) : null}
        {userData.job ? (
          <Text numberOfLines={1} ellipsizeMode="tail">
            {userData.job}
          </Text>
        ) : null}
        {userData.jobLocation ? (
          <Text numberOfLines={1} ellipsizeMode="tail">
            {userData.jobLocation}
          </Text>
        ) : null}
      </View>
    </>
  );
};

export default RequestsProfileInfo;
