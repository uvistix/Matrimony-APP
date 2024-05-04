// UserProfileEdit.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import { db } from "../../../firebaseConfig/FirebaseConfig";
import {
  raashiOptions,
  nakshatraOptions,
  udayaLagnaOptions,
  dhoshamOptions,
  motherTongueOptions,
  maritialStatusOptions,
  genderOptions,
  jobSectorOptions,
  heightOptions,
  incomeOptions,
  educationOptions,
  eatingHabitsOptions,
  languagesKnownOptions,
} from "../../../data/RenderFieldsData";
import Toast from "react-native-simple-toast";
import theme from "../../../themeProvider/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import RNPickerSelect from "react-native-picker-select";
import MultiSelect from "react-native-multiple-select";

import { useAuth } from "../../../authContext/AuthContext";
import Header from "../../../components/Header";
import { useNavigation } from "@react-navigation/native"; 
import SplashScreen from "../../../components/SplashScreen";

const UserProfileEdit = () => {
  const navigation = useNavigation();
  const { user, userData } = useAuth();
  const [loading, setLoading] = useState(false);

  // Personal Details
  const [name, setName] = useState(userData.name ?? "");
  const [number, setNumber] = useState(userData.number ?? "");
  const [gender, setGender] = useState(userData.gender ?? "");
  const [dob, setDOB] = useState(userData.dob ?? "");
  const [dobYear, setDOBYear] = useState(userData.dobYear ?? "");
  const [dobTime, setDOBTime] = useState(userData.dobTime ?? "");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    const minDate = calculateMinDate();

    if (date > minDate) {
      Alert.alert(
        "Invalid Date",
        `Minimum age requirement not met. Minimum age: ${
          gender === "Male" ? "21" : "18"
        }`
      );
      hideDatePicker();
      setDOB(null);
    } else {
      const birthYear = date.getFullYear();
      setDOBYear(birthYear.toString());
      setDOB(date.toLocaleDateString("en-GB")); // Use a consistent date format
      hideDatePicker();
    }
  };

  const calculateMinDate = () => {
    const minAge = gender === "Male" ? 21 : 18;
    const currentDate = new Date();
    return new Date(
      currentDate.getFullYear() - minAge,
      currentDate.getMonth(),
      currentDate.getDate()
    );
  };

  const handleTimeConfirm = (date) => {
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setDOBTime(formattedTime);
    hideTimePicker();
  };

  const [birthPlace, setBirthPlace] = useState(userData.birthPlace ?? "");
  const [height, setHeight] = useState(userData.height ?? "");
  const [maritalStatus, setMaritalStatus] = useState(
    userData.maritalStatus ?? ""
  );

  // Education & Professional Details
  const [education, setEducation] = useState(userData.education ?? "");
  const [languagesKnown, setLanguagesKnown] = useState([]);
  const [currentLanguagesKnown] = useState(userData.languagesKnown ?? "");
  const [updatedLanguagesKnown, setUpdatedLanguagesKnown] = useState("");

  useEffect(() => {
    const selectedLanguagesNames = languagesKnownOptions
      .filter((language) => languagesKnown.includes(language.id))
      .map((language) => language.name);

    finalLanguages = selectedLanguagesNames.join(", ");
    setUpdatedLanguagesKnown(finalLanguages);
  }, [languagesKnown]);

  const [jobSector, setJobSector] = useState(userData.jobSector ?? "");
  const [job, setJob] = useState(userData.job ?? "");
  const [jobLocation, setJobLocation] = useState(userData.jobLocation ?? "");
  const [income, setIncome] = useState(userData.income ?? "");

  // Family Details
  const [fatherName, setFatherName] = useState(userData.fatherName ?? "");
  const [motherName, setMotherName] = useState(userData.motherName ?? "");
  const [caste, setCaste] = useState("Bhovi / Wadder / Boyer");
  const [subCaste, setSubCaste] = useState(userData.subCaste ?? "");
  const [nativePlace, setNativePlace] = useState(userData.nativePlace ?? "");
  const [motherTongue, setMotherTongue] = useState(userData.motherTongue ?? "");
  const [brothers, setBrothers] = useState(userData.brothers ?? "0");
  const [sisters, setSisters] = useState(userData.sisters ?? "0");

  // Kundli Details
  const [raashi, setRaashi] = useState(userData.raashi ?? "");
  const [nakshatra, setNakshatra] = useState(userData.nakshatra ?? "");
  const [udayaLagna, setUdayaLagna] = useState(userData.udayaLagna ?? "");
  const [dhosham, setDhosham] = useState(userData.dhosham ?? "");

  // Expectations
  const [expectedPlace, setExpectedPlace] = useState(
    userData.expectedPlace ?? ""
  );
  const [eatingHabits, setEatingHabits] = useState(userData.eatingHabits ?? "");
  const [expectedJobSector, setExpectedJobSector] = useState(
    userData.expectedJobSector ?? ""
  );

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const renderInputFields = () => {
    switch (currentCategoryIndex) {
      case 0:
        return renderPersonalDetails();
      case 1:
        return renderEducationAndProfessionalDetails();
      case 2:
        return renderFamilyDetails();
      case 3:
        return renderKundliDetails();
      case 4:
        return renderExpectationsDetails();
      default:
        return null;
    }
  };

  const renderPersonalDetails = () => (
    <>
      {/* Personal Details */}
      <Text style={theme.profileInfoFieldHeadline}>Personal Details:</Text>

      <View>
        <Text style={theme.text}>Name</Text>
        <TextInput
          style={theme.input}
          placeholder="Enter your name..."
          placeholderTextColor={theme.inputPlaceholderColor}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View>
        <Text style={theme.text}>Number</Text>
        <TextInput
          style={theme.input}
          placeholder="Enter your number..."
          placeholderTextColor={theme.inputPlaceholderColor}
          value={number}
          keyboardType="numeric"
          onChangeText={setNumber}
        />
      </View>

      <Text style={theme.text}>Gender</Text>
      <View style={theme.dropDownInput}>
        <RNPickerSelect
          placeholder={{
            label: "Select gender...",
            value: null,
          }}
          onValueChange={(value) => {
            setGender(value);
            setDOB("");
            setDOBTime("");
          }}
          items={genderOptions}
          style={{
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          value={gender}
          useNativeAndroidPickerStyle={false}
          textInputProps={{ underlineColor: "yellow" }}
          Icon={() => (
            <Ionicons
              name="caret-down" // Adjust the icon name as per your preference
              size={15}
              style={theme.dropDownIcon}
            />
          )}
        />
      </View>

      {/* Date of Birth - Use react-native-datepicker */}
      {gender && (
        <>
          <Text style={theme.text}>Date of Birth</Text>
          <View style={theme.dropDownInput}>
            <TouchableOpacity onPress={showDatePicker}>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
                maximumDate={new Date()}
              />
              <TextInput
                style={styles.input}
                placeholder="DD-MM-YYYY"
                placeholderTextColor={theme.inputPlaceholderColor}
                value={dob}
                editable={false} // Prevent manual input, as the date is selected from the picker
              />
            </TouchableOpacity>
          </View>

          <Text style={theme.text}>Time of Birth</Text>
          <View style={theme.dropDownInput}>
            <TouchableOpacity onPress={showTimePicker}>
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
                
              />
              <TextInput
                style={styles.input}
                placeholder="HH:mm"
                placeholderTextColor={theme.inputPlaceholderColor}
                value={dobTime}
                editable={false}
              />
            </TouchableOpacity>
          </View>
        </>
      )}

      <View>
        <Text style={theme.text}>Birth Place</Text>
        <TextInput
          style={theme.input}
          placeholder="Enter your birth place..."
          placeholderTextColor={theme.inputPlaceholderColor}
          value={birthPlace}
          onChangeText={setBirthPlace}
        />
      </View>

      <Text style={theme.text}>Height</Text>
      <View style={theme.dropDownInput}>
        <RNPickerSelect
          placeholder={{
            label: "Select height...",
            value: null,
          }}
          onValueChange={(value) => setHeight(value)}
          items={heightOptions}
          style={{
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          value={height}
          useNativeAndroidPickerStyle={false}
          textInputProps={{ underlineColor: "yellow" }}
          Icon={() => (
            <Ionicons
              name="caret-down" // Adjust the icon name as per your preference
              size={15}
              color="gray"
            />
          )}
        />
      </View>

      <Text style={theme.text}>Marital Status</Text>
      <View style={theme.dropDownInput}>
        <RNPickerSelect
          placeholder={{
            label: "Select marital status...",
            value: null,
          }}
          onValueChange={(value) => setMaritalStatus(value)}
          items={maritialStatusOptions}
          style={{
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          value={maritalStatus}
          useNativeAndroidPickerStyle={false}
          textInputProps={{ underlineColor: "yellow" }}
          Icon={() => (
            <Ionicons
              name="caret-down" // Adjust the icon name as per your preference
              size={15}
              color="gray"
            />
          )}
        />
      </View>
    </>
  );

  const renderEducationAndProfessionalDetails = () => (
    <>
      {/* Education & Professional Details */}
      <Text style={theme.profileInfoFieldHeadline}>
        Education & Professional Details:
      </Text>

      <Text style={theme.text}>Education</Text>
      <View style={theme.dropDownInput}>
        <RNPickerSelect
          placeholder={{
            label: "Select education...",
            value: null,
          }}
          onValueChange={(value) => setEducation(value)}
          items={educationOptions}
          style={{
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          value={education}
          useNativeAndroidPickerStyle={false}
          textInputProps={{ underlineColor: "yellow" }}
          Icon={() => {
            return (
              <Ionicons
                name="caret-down" // Adjust the icon name as per your preference
                size={15}
                color="gray"
              />
            );
          }}
        />
      </View>

      <Text style={theme.text}>Languages Known</Text>
      <View style={theme.dropDownInput}>
        <MultiSelect
          items={languagesKnownOptions}
          uniqueKey="id"
          onSelectedItemsChange={setLanguagesKnown}
          selectedItems={languagesKnown}
          hideTags={true}
          searchIcon={false}
          textInputProps={{ editable: false }}
          searchInputPlaceholderText="Select known languages"
          selectedItemTextColor={theme.primaryColor}
          selectedItemIconColor={theme.primaryColor}
          itemTextColor={theme.blackSecondaryColor}
          selectText="Select Languages"
          submitButtonColor={theme.primaryColor}
          submitButtonText="Select"
        />
        {currentLanguagesKnown && (
          <Text style={theme.input}>Current: {currentLanguagesKnown}</Text>
        )}
        {updatedLanguagesKnown && (
          <Text style={theme.input}>Updated: {updatedLanguagesKnown}</Text>
        )}
      </View>

      <Text style={theme.text}>Job Sector</Text>
      <View style={theme.dropDownInput}>
        <RNPickerSelect
          placeholder={{
            label: "Select job sector...",
            value: null,
          }}
          onValueChange={(value) => {
            setJobSector(value);
            setJob("");
            setJobLocation("");
            setIncome("");
          }}
          items={jobSectorOptions}
          style={{
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          value={jobSector}
          useNativeAndroidPickerStyle={false}
          textInputProps={{ underlineColor: "yellow" }}
          Icon={() => {
            return (
              <Ionicons
                name="caret-down" // Adjust the icon name as per your preference
                size={15}
                color="gray"
              />
            );
          }}
        />
      </View>
      {jobSector && jobSector !== "Not Applicable" && (
        <View>
          <Text style={theme.text}>Job</Text>
          <TextInput
            style={theme.input}
            placeholder="Enter job..."
            placeholderTextColor={theme.inputPlaceholderColor}
            value={job}
            onChangeText={setJob}
          />
        </View>
      )}
      {jobSector && jobSector !== "Not Applicable" && job && (
        <View>
          <Text style={theme.text}>Job Location</Text>
          <TextInput
            style={theme.input}
            placeholder="Enter job location..."
            placeholderTextColor={theme.inputPlaceholderColor}
            value={jobLocation}
            onChangeText={setJobLocation}
          />
        </View>
      )}
      {jobSector && jobSector !== "Not Applicable" && jobLocation && (
        <>
          <Text style={theme.text}>Income</Text>
          <View style={theme.dropDownInput}>
            <RNPickerSelect
              placeholder={{
                label: "Select income...",
                value: null,
              }}
              onValueChange={(value) => setIncome(value)}
              items={incomeOptions}
              style={{
                iconContainer: {
                  top: 10,
                  right: 12,
                },
              }}
              value={income}
              useNativeAndroidPickerStyle={false}
              textInputProps={{ underlineColor: "yellow" }}
              Icon={() => {
                return (
                  <Ionicons
                    name="caret-down" // Adjust the icon name as per your preference
                    size={15}
                    color="gray"
                  />
                );
              }}
            />
          </View>
        </>
      )}
    </>
  );
  const renderFamilyDetails = () => (
    <>
      {/* Family Details */}
      <Text style={theme.profileInfoFieldHeadline}>Family Details:</Text>

      <View>
        <Text style={theme.text}>Father Name</Text>
        <TextInput
          style={theme.input}
          placeholder="Enter father name"
          placeholderTextColor={theme.inputPlaceholderColor}
          value={fatherName}
          onChangeText={setFatherName}
        />
      </View>

      <View>
        <Text style={theme.text}>Mother Name</Text>
        <TextInput
          style={theme.input}
          placeholder="Enter mother name"
          placeholderTextColor={theme.inputPlaceholderColor}
          value={motherName}
          onChangeText={setMotherName}
        />
      </View>
      <View>
        <Text style={theme.text}>Native Place</Text>
        <TextInput
          style={theme.input}
          placeholder="Enter native place"
          placeholderTextColor={theme.inputPlaceholderColor}
          value={nativePlace}
          onChangeText={setNativePlace}
        />
      </View>

      <Text style={theme.text}>Mother Tongue</Text>
      <View style={theme.dropDownInput}>
        <RNPickerSelect
          placeholder={{
            label: "Select mother tongue",
            value: null,
          }}
          onValueChange={(value) => setMotherTongue(value)}
          items={motherTongueOptions}
          style={{
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          value={motherTongue}
          useNativeAndroidPickerStyle={false}
          textInputProps={{ underlineColor: "yellow" }}
          Icon={() => {
            return (
              <Ionicons
                name="caret-down" // Adjust the icon name as per your preference
                size={15}
                color="gray"
              />
            );
          }}
        />
      </View>
      <View>
          <Text style={theme.text}>Caste</Text>
          <TextInput
            style={theme.input}
            placeholder="Enter caste"
            placeholderTextColor={theme.inputPlaceholderColor}
            value={caste}
            editable={false}
            onChangeText={setCaste}
          />
        </View>
      {motherTongue && (
        <View>
          <Text style={theme.text}>Sub Caste / Kulam / Surname</Text>
          <TextInput
            style={theme.input}
            placeholder="Enter sub-caste"
            placeholderTextColor={theme.inputPlaceholderColor}
            value={subCaste}
            onChangeText={setSubCaste}
          />
        </View>
      )}

      {subCaste && (
        <>
          <View>
            <Text style={theme.text}>Brothers</Text>
            <TextInput
              style={theme.input}
              placeholder="Enter number of brother's"
              placeholderTextColor={theme.inputPlaceholderColor}
              value={brothers.toString()}
              onChangeText={setBrothers}
              keyboardType="numeric"
            />
          </View>

          <View>
            <Text style={theme.text}>Sisters</Text>
            <TextInput
              style={theme.input}
              placeholder="Enter number of sister's"
              placeholderTextColor={theme.inputPlaceholderColor}
              value={sisters.toString()}
              onChangeText={setSisters}
              keyboardType="numeric"
            />
          </View>
        </>
      )}
    </>
  );
  const renderKundliDetails = () => (
    <>
      {/* Kundli Details */}
      <Text style={theme.profileInfoFieldHeadline}>Kundli Details:</Text>

      <Text style={theme.text}>Raashi</Text>
      <View style={theme.dropDownInput}>
        <RNPickerSelect
          placeholder={{
            label: "Select raashi",
            value: null,
          }}
          onValueChange={(value) => setRaashi(value)}
          items={raashiOptions}
          style={{
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          value={raashi}
          useNativeAndroidPickerStyle={false}
          textInputProps={{ underlineColor: "yellow" }}
          Icon={() => {
            return (
              <Ionicons
                name="caret-down" // Adjust the icon name as per your preference
                size={15}
                color="gray"
              />
            );
          }}
        />
      </View>

      <Text style={theme.text}>Nakshatra</Text>
      <View style={theme.dropDownInput}>
        <RNPickerSelect
          placeholder={{
            label: "Select nakshatra",
            value: null,
          }}
          onValueChange={(value) => setNakshatra(value)}
          items={nakshatraOptions}
          style={{
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          value={nakshatra}
          useNativeAndroidPickerStyle={false}
          textInputProps={{ underlineColor: "yellow" }}
          Icon={() => {
            return (
              <Ionicons
                name="caret-down" // Adjust the icon name as per your preference
                size={15}
                color="gray"
              />
            );
          }}
        />
      </View>

      <Text style={theme.text}>Udaya Lagna</Text>
      <View style={theme.dropDownInput}>
        <RNPickerSelect
          placeholder={{
            label: "Select udaya lagna",
            value: null,
          }}
          onValueChange={(value) => setUdayaLagna(value)}
          items={udayaLagnaOptions}
          style={{
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          value={udayaLagna}
          useNativeAndroidPickerStyle={false}
          textInputProps={{ underlineColor: "yellow" }}
          Icon={() => {
            return (
              <Ionicons
                name="caret-down" // Adjust the icon name as per your preference
                size={15}
                color="gray"
              />
            );
          }}
        />
      </View>

      <Text style={theme.text}>Dhosham</Text>
      <View style={theme.dropDownInput}>
        <RNPickerSelect
          placeholder={{
            label: "Select dhosham",
            value: null,
          }}
          onValueChange={(value) => setDhosham(value)}
          items={dhoshamOptions}
          style={{
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          value={dhosham}
          useNativeAndroidPickerStyle={false}
          textInputProps={{ underlineColor: "yellow" }}
          Icon={() => {
            return (
              <Ionicons
                name="caret-down" // Adjust the icon name as per your preference
                size={15}
                color="gray"
              />
            );
          }}
        />
      </View>
    </>
  );
  const renderExpectationsDetails = () => (
    <>
      <Text style={theme.profileInfoFieldHeadline}>Expectations Details:</Text>

      <View>
        <Text style={theme.text}>Expected Place</Text>
        <TextInput
          style={theme.input}
          placeholder="Enter expected place..."
          value={expectedPlace}
          onChangeText={setExpectedPlace}
        />
      </View>

      <Text style={theme.text}>Eating Habits</Text>
      <View style={theme.dropDownInput}>
        <RNPickerSelect
          placeholder={{
            label: "Select eating habits",
            value: null,
          }}
          onValueChange={(value) => setEatingHabits(value)}
          items={eatingHabitsOptions}
          style={{
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          value={eatingHabits}
          useNativeAndroidPickerStyle={false}
          textInputProps={{ underlineColor: "yellow" }}
          Icon={() => {
            return (
              <Ionicons
                name="caret-down" // Adjust the icon name as per your preference
                size={15}
                color="gray"
              />
            );
          }}
        />
      </View>

      <Text style={theme.text}>Expected Job Sector</Text>
      <View style={theme.dropDownInput}>
        <RNPickerSelect
          placeholder={{
            label: "Select expected job sector",
            value: null,
          }}
          onValueChange={(value) => setExpectedJobSector(value)}
          items={jobSectorOptions}
          style={{
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          value={expectedJobSector}
          useNativeAndroidPickerStyle={false}
          textInputProps={{ underlineColor: "yellow" }}
          Icon={() => {
            return (
              <Ionicons
                name="caret-down" // Adjust the icon name as per your preference
                size={15}
                color="gray"
              />
            );
          }}
        />
      </View>
    </>
  );

  const validatePersonalDetails = () => {
    if (
      !name ||
      !number ||
      !gender ||
      !dob ||
      !dobTime ||
      !dobYear ||
      !birthPlace ||
      !height ||
      !maritalStatus
    ) {
      Toast.show("Error! Please fill in all required fields", Toast.SHORT);
      return false;
    }
    return true;
  };
  const validateEducationAndProfessionalDetails = () => {
    if (
      !education ||
      !jobSector ||
      !(currentLanguagesKnown || updatedLanguagesKnown)
    ) {
      Toast.show("Error! Please fill in all required fields", Toast.SHORT);
      return false;
    }

    if (jobSector !== "Not Applicable" && (!job || !jobLocation || !income)) {
      Toast.show("Error! Please fill in all required fields", Toast.SHORT);
      return false;
    }

    return true;
  };

  const validateFamilyDetails = () => {
    if (
      !fatherName ||
      !motherName ||
      !subCaste ||
      !nativePlace ||
      !motherTongue ||
      !brothers ||
      !sisters
    ) {
      Toast.show("Error! Please fill in all required fields", Toast.SHORT);
      return false;
    }
    return true;
  };
  const validateKundliDetails = () => {
    if (!raashi || !nakshatra || !udayaLagna || !dhosham) {
      Toast.show("Error! Please fill in all required fields", Toast.SHORT);
      return false;
    }
    return true;
  };
  const validateExpectationsDetails = () => {
    if (!eatingHabits || !expectedJobSector) {
      Toast.show("Error! Please fill in all required fields", Toast.SHORT);
      return false;
    }
    return true;
  };

  const renderEditButtons = () => {
    return (
      <>
        {currentStep < totalSteps ? (
          <TouchableOpacity style={theme.primaryButton} onPress={goToNextStep}>
            <Text style={theme.primaryButtonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={theme.primaryButton}
            onPress={handleUpdateProfile}
          >
            <Text style={theme.primaryButtonText}>
              {userData.profileStatus ? "Save Profile" : "Complete Sign Up"}
            </Text>
          </TouchableOpacity>
        )}
        {currentStep > 1 && (
          <TouchableOpacity
            style={theme.secondaryButton}
            onPress={goToPrevStep}
          >
            <Text style={theme.secondaryButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
      </>
    );
  };

  const goToNextStep = () => {
    const isValid = validateCurrentStep();
    if (isValid && currentStep < totalSteps) {
      setCurrentStep((prevStep) => prevStep + 1);
      setCurrentCategoryIndex((prevIndex) => prevIndex + 1);
    }
  };
  const validateCurrentStep = () => {
    switch (currentCategoryIndex) {
      case 0:
        return validatePersonalDetails();
      case 1:
        return validateEducationAndProfessionalDetails();
      case 2:
        return validateFamilyDetails();
      case 3:
        return validateKundliDetails();
      case 4:
        return validateExpectationsDetails();
      default:
        return true;
    }
  };
  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
      setCurrentCategoryIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleUpdateProfile = async () => {
    const isValid = validateCurrentStep();
    if (isValid) {
      try {
        setLoading(true);
        const userDoc = db.collection("users").doc(user.uid);
        const docSnapshot = await userDoc.get();

        const profileData = {
          name,
          number,
          gender,
          dob,
          dobTime,
          dobYear,
          birthPlace,
          height,
          maritalStatus,
          education,
          languagesKnown: updatedLanguagesKnown
            ? updatedLanguagesKnown
            : currentLanguagesKnown,
          jobSector,
          job,
          jobLocation,
          income,
          fatherName,
          motherName,
          caste,
          subCaste,
          nativePlace,
          motherTongue,
          brothers,
          sisters,
          raashi,
          nakshatra,
          udayaLagna,
          dhosham,
          expectedPlace,
          eatingHabits,
          expectedJobSector,
          profileStatus: true,
        };

        if (docSnapshot.exists) {
          await userDoc.update(profileData);
        } else {
          await userDoc.set(profileData);
        }
        Alert.alert(
          "Success!",
          "Profile data updated successfully."
        );

        navigation.navigate("Home");
      } catch (error) {
        Alert.alert("Oops! Something went wrong, please try again");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <View style={theme.mainContainer}>
      <Header title="Update Profile" />
      <SplashScreen visible={loading} />
      <View style={theme.flexView}>
        <View style={theme.card}>
          <FlatList
            // style={theme.card}
            keyboardShouldPersistTaps="handled"
            data={[{ key: "inputFields" }]}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <>{renderInputFields()}</>}
            ListFooterComponent={<>{renderEditButtons()}</>}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    // marginBottom: 20,
  },
});

export default UserProfileEdit;
