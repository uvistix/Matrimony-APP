import React, { memo, useMemo } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../themeProvider/ThemeProvider";
import { calculateAge, mapHeightToString } from "../utils/utils"

const ProfileItem = memo(({ item, onPress }) => {

  const age = useMemo(() => calculateAge(item.dobYear), [item.dobYear]);
  const height = useMemo(() => mapHeightToString(parseInt(item.height)), [item.height]);

  return (
    <TouchableOpacity style={theme.profileCard} onPress={onPress}>
      <View>
        {/* Image */}
        <View style={{ position: "relative" }}>
          {item.profileImage ? (
            <Image
              source={{ uri: item.profileImage }}
              style={{ width: "auto", height: 350, borderRadius: 8 }}
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
            {item.verified && (
              <View style={theme.homeProfileVerifiedContainer}>
               <View style={{alignItems: "center"}}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={50}
                  color={"green"}
                  // padding={10}
                />
                <Text style={{color:"green", fontWeight: "500"}}>Verified</Text>
              </View>
              </View>
            )}
            {/* profile ID */}
            <View style={theme.homeProfileIdContainer}>
              <Text style={theme.homeProfileId}>ID: {item.id}</Text>
            </View>
            {/* Overlay View for Text */}
            <View style={theme.homeProfileBottomDetails}>
              {/* Left side text */}
              <View style={theme.homeProfileColumn}>
                <Text
                  style={theme.homeProfileDetailsStyles}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>
                {age && height ? (
                  <Text
                    style={{ color: "white" }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {age} Yrs, {height}
                  </Text>
                ) : null}
                {item.nativePlace ? (
                  <Text
                    style={{ color: "white" }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.nativePlace}
                  </Text>
                ) : null}
              </View>
              <View
                style={[
                  {
                    borderLeftWidth: 1,
                    marginHorizontal: 5,
                    borderColor: "white",
                  },
                ]}
              ></View>

              {/* Right side text */}
              <View style={theme.homeProfileColumn}>
                {item.education ? (
                  <Text
                    style={{ color: "white" }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.education}
                  </Text>
                ) : null}
                {item.job ? (
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ color: "white" }}
                  >
                    {item.job}
                  </Text>
                ) : item.jobSector === "Not Applicable" ? (
                  <>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{ color: "white" }}
                    >
                      Professional Details;
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{ color: "white" }}
                    >
                      {item.jobSector}
                    </Text>
                  </>
                ) : null}

                {item.jobLocation ? (
                  <Text
                    style={{ color: "white" }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.jobLocation}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default ProfileItem;
