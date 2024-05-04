import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import ImageViewer from "react-native-image-zoom-viewer";
import { mapHeightToString } from "../utils/utils"

const ProfileContentInfo = ({
  currentItem,
  theme,
  requestsSentStatus,
  requestsReceivedStatus,
  userData,
}) => {
  const [isZoomModalVisible, setZoomModalVisible] = useState(false);

  return (
    <View style={theme.mainContainer}>
      <View style={{ marginBottom: 65 }}>
        <View style={theme.card}>
          <View>
            {currentItem.profileImage ? (
              <View style={{ position: "relative" }}>
                <TouchableOpacity onPress={() => setZoomModalVisible(true)}>
                  <Image
                    source={{ uri: currentItem.profileImage }}
                    style={theme.profileInfoImage}
                  />
                  <View style={{ position: "absolute", bottom: 10, right: 10 }}>
                    <Image
                      source={require("../../assets/bwbm-logo.png")}
                      style={{ width: 100, height: 100, resizeMode: "contain" }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <Ionicons
                name="person-circle"
                size={150}
                style={theme.iconPrimaryColor}
              />
            )}
            {currentItem.verified && (
              <View style={theme.homeProfileVerifiedContainer}>
              <View style={{alignItems: "center"}}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={50}
                  color={"green"}
                />
                <Text style={{color:"green", fontWeight: "500"}}>Verified</Text>
              </View>
              </View>
            )}
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={[theme.title, { textAlign: 'center' }]}>{currentItem.name}</Text>
            <Text style={theme.headingSmall}>ID: {currentItem.id}</Text>
          </View>
          <View style={theme.profileInfoContainer}>
            <Text style={theme.profileInfoFieldHeadline}>
              Personal Details:
            </Text>
            {currentItem.number &&
              (requestsReceivedStatus === "request accepted" ||
                requestsSentStatus === "request accepted" ||
                userData.userType === "admin") && (
                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Number</Text>
                  <Text style={theme.profileInfoFieldValue}>
                    : {currentItem.number}
                  </Text>
                </View>
              )}

            {currentItem.gender && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>Gender</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.gender}
                </Text>
              </View>
            )}

            {currentItem.dob && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>Birth Date</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.dob}
                </Text>
              </View>
            )}

            {currentItem.dobTime && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>Birth Time</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.dobTime}
                </Text>
              </View>
            )}
            {currentItem.birthPlace && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>Birth Place</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.birthPlace}
                </Text>
              </View>
            )}

            {currentItem.height && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>Height</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {mapHeightToString(parseInt(currentItem.height))}
                </Text>
              </View>
            )}

            {currentItem.maritalStatus && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>Marital Status</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.maritalStatus}
                </Text>
              </View>
            )}
            <Text style={theme.profileInfoFieldHeadline}>
              Education & Professional Details:
            </Text>
            {currentItem.education && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>Education</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.education}
                </Text>
              </View>
            )}

            {currentItem.languagesKnown && (
              <View
                style={theme.profileInfoFieldContainer}

              >
                <Text style={theme.profileInfoFieldTitle}>Languages Known</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.languagesKnown}
                </Text>
              </View>
            )}

            {currentItem.jobSector && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>Job Sector</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.jobSector}
                </Text>
              </View>
            )}

            {currentItem.job && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>Job</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.job}
                </Text>
              </View>
            )}

            {currentItem.jobLocation && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>Job Location</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.jobLocation}
                </Text>
              </View>
            )}

            {currentItem.income && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>Income</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.income}
                </Text>
              </View>
            )}
            <Text style={theme.profileInfoFieldHeadline}>Family Details:</Text>
            {currentItem.fatherName && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>Father Name</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.fatherName}
                </Text>
              </View>
            )}

            {currentItem.motherName && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>Mother Name</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.motherName}
                </Text>
              </View>
            )}

            {currentItem.caste && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>Caste</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.caste}
                </Text>
              </View>
            )}

            {currentItem.subCaste && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>Sub Caste / Kulam / Surname</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.subCaste}
                </Text>
              </View>
            )}

            {currentItem.nativePlace && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>Native Place</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.nativePlace}
                </Text>
              </View>
            )}

            {currentItem.motherTongue && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>Mother Tongue</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.motherTongue}
                </Text>
              </View>
            )}

            {currentItem.brothers !== undefined && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>No. of Brothers</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.brothers}
                </Text>
              </View>
            )}

            {currentItem.sisters !== undefined && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>No. of Sisters</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.sisters}
                </Text>
              </View>
            )}
            <Text style={theme.profileInfoFieldHeadline}>Kundli Details:</Text>
            {currentItem.raashi && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>Raashi</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.raashi}
                </Text>
              </View>
            )}

            {currentItem.nakshatra && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>Nakshatra</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.nakshatra}
                </Text>
              </View>
            )}

            {currentItem.udayaLagna && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>Udaya Lagna</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.udayaLagna}
                </Text>
              </View>
            )}

            {currentItem.dhosham && (
              <View style={theme.profileInfoFieldContainer}>
                <Text style={theme.profileInfoFieldTitle}>Dhosham</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.dhosham}
                </Text>
              </View>
            )}
            <Text style={theme.profileInfoFieldHeadline}>
              Expectations Details:
            </Text>
            {currentItem.expextedPlace && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>Expexted Place</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.expextedPlace}
                </Text>
              </View>
            )}

            {currentItem.eatingHabits && (
              <View style={theme.profileInfoFieldContainer} >
                <Text style={theme.profileInfoFieldTitle}>Eating Habits</Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.eatingHabits}
                </Text>
              </View>
            )}

            {currentItem.expectedJobSector && (
              <View
                style={theme.profileInfoFieldContainer}

              >
                <Text style={theme.profileInfoFieldTitle}>
                  Expected Job Sector
                </Text>
                <Text style={theme.profileInfoFieldValue}>
                  : {currentItem.expectedJobSector}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <Modal
        isVisible={isZoomModalVisible}
        onBackdropPress={() => setZoomModalVisible(false)}
        onBackButtonPress={() => setZoomModalVisible(false)}
        style={{ margin: 0 }}
      >
        <ImageViewer
          imageUrls={[{ url: currentItem.profileImage }]}
          index={0}
          renderIndicator={() => null}
          enableSwipeDown
          onSwipeDown={() => setZoomModalVisible(false)}
          renderImage={(props) => (
            <View style={{ flex: 1 }}>
              <Image
                {...props}
                style={{ flex: 1, backgroundColor: "black" }}
              />
              <View style={{ position: "absolute", bottom: 10, right: 10 }}>
                <Image
                  source={require("../../assets/bwbm-logo.png")}
                  style={{ width: 120, height: 120, resizeMode: "contain" }}
                />
              </View>
            </View>
          )}
        />

      </Modal>
    </View>
  );
};

export default ProfileContentInfo;
