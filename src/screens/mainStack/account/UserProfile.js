import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../themeProvider/ThemeProvider";
import { useAuth } from "../../../authContext/AuthContext";
import ImagePickerComponent from "../../../components/ImagePicker";
import { mapHeightToString } from "../../../utils/utils";

export default function Profile() {
  const { user, userData } = useAuth();

  const navigation = useNavigation();

  // Profile Picture
  const [profileImage, setProfileImage] = useState(null);

  const id = userData.id ?? "";
  // Personal Details
  const name = userData.name ?? "";
  const number = userData.number ?? "";
  const gender = userData.gender ?? "";
  const dob = userData.dob ?? "";
  const dobTime = userData.dobTime ?? "";

  const birthPlace = userData.birthPlace ?? "";
  const height = userData.height ?? "";
  const maritalStatus = userData.maritalStatus ?? "";

  // Education & Professional Details
  const education = userData.education ?? "";
  const languagesKnown = userData.languagesKnown ?? "";
  const jobSector = userData.jobSector ?? "";
  const job = userData.job ?? "";
  const jobLocation = userData.jobLocation ?? "";
  const income = userData.income ?? "";

  // Family Details
  const fatherName = userData.fatherName ?? "";
  const motherName = userData.motherName ?? "";
  const caste = userData.caste ?? "Bhovi / Wadder / Boyer";
  const subCaste = userData.subCaste ?? "";
  const nativePlace = userData.nativePlace ?? "";
  const motherTongue = userData.motherTongue ?? "";
  const brothers = userData.brothers ?? 0;
  const sisters = userData.sisters ?? 0;

  // Kundli Details
  const raashi = userData.raashi ?? "";
  const nakshatra = userData.nakshatra ?? "";
  const udayaLagna = userData.udayaLagna ?? "";
  const dhosham = userData.dhosham ?? "";

  // Expectations
  const expectedPlace = userData.expectedPlace ?? "";
  const eatingHabits = userData.eatingHabits ?? "";
  const expectedJobSector = userData.expectedJobSector ?? "";

  const renderButtons = () => {
    return (
      <View style={{ marginBottom: 10, marginTop: 25 }}>
        <TouchableOpacity
          style={theme.primaryButton}
          onPress={() =>
            navigation.navigate("AccountStack", {
              screen: "ProfileEdit",
            })
          }
        >
          <Text style={theme.primaryButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={theme.secondaryButton}
          onPress={() =>
            navigation.navigate("AccountStack", {
              screen: "Email Password",
            })
          }
        >
          <Text style={theme.secondaryButtonText}>
            Reset Password / Delete Account
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={theme.mainContainer}>
        <View style={theme.flexView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={theme.card}>
              <ImagePickerComponent
                user={user}
                setProfileImage={setProfileImage}
                profileImage={profileImage}
                theme={theme}
              />

              <View style={{ alignItems: "center", marginTop: 15 }}>
                <Text style={theme.headingSmall}>ID: {id}</Text>
              </View>
              <View>
                <Text style={theme.profileInfoFieldHeadline}>
                  Personal Details:
                </Text>
                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Name</Text>
                  <Text style={theme.profileInfoFieldValue}>: {name}</Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Number</Text>
                  <Text style={theme.profileInfoFieldValue}>: {number}</Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Gender</Text>
                  <Text style={theme.profileInfoFieldValue}>: {gender}</Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Birth Date</Text>
                  <Text style={theme.profileInfoFieldValue}>: {dob}</Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Birth Time</Text>
                  <Text style={theme.profileInfoFieldValue}>: {dobTime}</Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Birth Place</Text>
                  <Text style={theme.profileInfoFieldValue}>
                    : {birthPlace}
                  </Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Height</Text>
                  <Text style={theme.profileInfoFieldValue}>
                    : {mapHeightToString(parseInt(height))}
                  </Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>
                    Marital Status
                  </Text>
                  <Text style={theme.profileInfoFieldValue}>
                    : {maritalStatus}
                  </Text>
                </View>
                <Text style={theme.profileInfoFieldHeadline}>
                  Education & Professional Details:
                </Text>
                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Education</Text>
                  <Text style={theme.profileInfoFieldValue}>: {education}</Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>
                    Languages Known
                  </Text>
                  <Text style={theme.profileInfoFieldValue}>
                    : {languagesKnown}
                  </Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Job Sector</Text>
                  <Text style={theme.profileInfoFieldValue}>: {jobSector}</Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Job</Text>
                  <Text style={theme.profileInfoFieldValue}>: {job}</Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Job Location</Text>
                  <Text style={theme.profileInfoFieldValue}>
                    : {jobLocation}
                  </Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Income</Text>
                  <Text style={theme.profileInfoFieldValue}>: {income}</Text>
                </View>
                <Text style={theme.profileInfoFieldHeadline}>
                  Family Details:
                </Text>
                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Father Name</Text>
                  <Text style={theme.profileInfoFieldValue}>
                    : {fatherName}
                  </Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Mother Name</Text>
                  <Text style={theme.profileInfoFieldValue}>
                    : {motherName}
                  </Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Caste</Text>
                  <Text style={theme.profileInfoFieldValue}>: {caste}</Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>
                    Sub Caste / Kulam / Surname
                  </Text>
                  <Text style={theme.profileInfoFieldValue}>: {subCaste}</Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Native Place</Text>
                  <Text style={theme.profileInfoFieldValue}>
                    : {nativePlace}
                  </Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Mother Tongue</Text>
                  <Text style={theme.profileInfoFieldValue}>
                    : {motherTongue}
                  </Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Brothers</Text>
                  <Text style={theme.profileInfoFieldValue}>: {brothers}</Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Sisters</Text>
                  <Text style={theme.profileInfoFieldValue}>: {sisters}</Text>
                </View>
                <Text style={theme.profileInfoFieldHeadline}>
                  Kundli Details:
                </Text>
                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Raashi</Text>
                  <Text style={theme.profileInfoFieldValue}>: {raashi}</Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Nakshatra</Text>
                  <Text style={theme.profileInfoFieldValue}>: {nakshatra}</Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Udaya Lagna</Text>
                  <Text style={theme.profileInfoFieldValue}>
                    : {udayaLagna}
                  </Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Dhosham</Text>
                  <Text style={theme.profileInfoFieldValue}>: {dhosham}</Text>
                </View>
                <Text style={theme.profileInfoFieldHeadline}>
                  Expectations Details:
                </Text>
                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>
                    Expected Place
                  </Text>
                  <Text style={theme.profileInfoFieldValue}>
                    : {expectedPlace}
                  </Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>Eating Habits</Text>
                  <Text style={theme.profileInfoFieldValue}>
                    : {eatingHabits}
                  </Text>
                </View>

                <View style={theme.profileInfoFieldContainer}>
                  <Text style={theme.profileInfoFieldTitle}>
                    Expected Job Sector
                  </Text>
                  <Text style={theme.profileInfoFieldValue}>
                    : {expectedJobSector}
                  </Text>
                </View>
              </View>
              {renderButtons()}
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}
