import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Modal, Portal } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import theme from "../themeProvider/ThemeProvider";
import {
  motherTongueOptions,
  maritialStatusOptions,
  jobSectorOptions,
  heightFilterOptions,
  educationOptions,
  eatingHabitsOptions,
  ageOptions,
} from "../data/RenderFieldsData";
import _ from "lodash";

const Filter = ({ onFilter, onReset, selectedFilters }) => {
  const [ageFilter, setAgeFilter] = useState(null);

  const [heightFilter, setHeightFilter] = useState(
    selectedFilters.heightFilter === "" ? null : selectedFilters.heightFilter
  );
  const [maritalStatusFilter, setMaritalStatusFilter] = useState(
    selectedFilters.maritalStatusFilter === ""
      ? null
      : selectedFilters.maritalStatusFilter
  );
  const [educationFilter, setEducationFilter] = useState(
    selectedFilters.educationFilter === ""
      ? null
      : selectedFilters.educationFilter
  );
  const [jobSectorFilter, setJobSectorFilter] = useState(
    selectedFilters.jobSectorFilter === ""
      ? null
      : selectedFilters.jobSectorFilter
  );
  const [jobLocationFilter, setJobLocationFilter] = useState(
    selectedFilters.jobLocationFilter === ""
      ? null
      : selectedFilters.jobLocationFilter
  );

  const [motherTongueFilter, setMotherTongueFilter] = useState(
    selectedFilters.motherTongueFilter === ""
      ? null
      : selectedFilters.motherTongueFilter
  );

  const [eatingHabitsFilter, setEatingHabitsFilter] = useState(
    selectedFilters.eatingHabitsFilter === ""
      ? null
      : selectedFilters.eatingHabitsFilter
  );
  const [searchQuery, setSearchQuery] = useState("");

  const [isNewFilter, setIsNewFilter] = useState(selectedFilters.isNewFilter);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleFilterClick = () => {
    onFilter({
      ageFilter,

      heightFilter,
      maritalStatusFilter,
      educationFilter,
      jobSectorFilter,
      jobLocationFilter,

      motherTongueFilter,

      eatingHabitsFilter,
      isNewFilter,
    });
    setIsModalVisible(false);
  };

  const handleResetClick = () => {
    setAgeFilter(null);

    setHeightFilter(null);
    setMaritalStatusFilter(null);
    setEducationFilter(null);
    setJobSectorFilter(null);
    setJobLocationFilter(null);

    setMotherTongueFilter(null);

    setEatingHabitsFilter(null);

    setIsNewFilter(false);
    setSearchQuery("")

    onReset();
    setIsModalVisible(false);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const filterStatus =
    ageFilter ||
    heightFilter ||
    maritalStatusFilter ||
    educationFilter ||
    jobSectorFilter ||
    jobLocationFilter ||
    motherTongueFilter ||
    eatingHabitsFilter ||
    searchQuery;

  const debouncedSearch = _.debounce((text) => {
    onFilter({ ...selectedFilters, searchFilter: text });
  }, 400);

  return (
    <View style={theme.filterContainer}>
      <View style={theme.filterTextContainer}>
        <View style={theme.filterSearchContainer}>
          <Ionicons
            name="search"
            size={24}
            style={
              filterStatus ? theme.iconPrimaryColor : theme.iconDisabledColor
            }
          />
          <TextInput
            style={theme.filterSearchBar}
            placeholder="Search Profile Name / ID"
            placeholderTextColor={theme.inputPlaceholderColor}
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              debouncedSearch(text);
            }}
          />
          <TouchableOpacity onPress={searchQuery ? handleResetClick : toggleModal} style={theme.filterBox}>
            <Ionicons
              name={searchQuery ? "close" : "filter"}
              style={
                filterStatus ? theme.iconPrimaryColor : theme.iconDisabledColor
              }
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={toggleModal}
          style={theme.flexView}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={theme.filterModalContainer}>
              <View style={theme.filterModalHeader}>
                <Text style={theme.title}>Filter Options</Text>
                <Ionicons
                  name="close-circle"
                  size={30}
                  style={theme.iconPrimaryColor}
                  onPress={toggleModal}
                />
              </View>

              {/* Age Filter */}
              <View style={theme.dropDownContainer}>
                <Text style={theme.text}>Age</Text>
                <View style={theme.dropDownInput}>
                  <RNPickerSelect
                    placeholder={{
                      label: "Select Age...",
                      value: null,
                    }}
                    style={{
                      iconContainer: {
                        top: 10,
                        right: 12,
                      },
                    }}
                    onValueChange={(value) => setAgeFilter(value)}
                    items={ageOptions}
                    value={ageFilter}
                    useNativeAndroidPickerStyle={false}
                    textInputProps={{ underlineColor: "yellow" }}
                    Icon={() => (
                      <Ionicons
                        name="caret-down"
                        size={15}
                        style={theme.dropDownIcon}
                      />
                    )}
                  />
                </View>
              </View>

              {/* Height Filter */}
              <View style={theme.dropDownContainer}>
                <Text style={theme.text}>Height</Text>
                <View style={theme.dropDownInput}>
                  <RNPickerSelect
                    placeholder={{
                      label: "Select height...",
                      value: null,
                    }}
                    style={{
                      iconContainer: {
                        top: 10,
                        right: 12,
                      },
                    }}
                    onValueChange={(value) => setHeightFilter(value)}
                    items={heightFilterOptions}
                    value={heightFilter}
                    useNativeAndroidPickerStyle={false}
                    textInputProps={{ underlineColor: "yellow" }}
                    Icon={() => (
                      <Ionicons
                        name="caret-down"
                        size={15}
                        style={theme.dropDownIcon}
                      />
                    )}
                  />
                </View>
              </View>

              {/* Marital Filter */}
              <View style={theme.dropDownContainer}>
                <Text style={theme.text}>Marital Status</Text>
                <View style={theme.dropDownInput}>
                  <RNPickerSelect
                    placeholder={{
                      label: "Select marital status...",
                      value: null,
                    }}
                    style={{
                      iconContainer: {
                        top: 10,
                        right: 12,
                      },
                    }}
                    onValueChange={(value) => setMaritalStatusFilter(value)}
                    items={maritialStatusOptions}
                    value={maritalStatusFilter}
                    useNativeAndroidPickerStyle={false}
                    textInputProps={{ underlineColor: "yellow" }}
                    Icon={() => (
                      <Ionicons
                        name="caret-down"
                        size={15}
                        style={theme.dropDownIcon}
                      />
                    )}
                  />
                </View>
              </View>

              {/* Education Filter */}
              <View style={theme.dropDownContainer}>
                <Text style={theme.text}>Education</Text>
                <View style={theme.dropDownInput}>
                  <RNPickerSelect
                    placeholder={{
                      label: "Select education...",
                      value: null,
                    }}
                    style={{
                      iconContainer: {
                        top: 10,
                        right: 12,
                      },
                    }}
                    onValueChange={(value) => setEducationFilter(value)}
                    items={educationOptions}
                    value={educationFilter}
                    useNativeAndroidPickerStyle={false}
                    textInputProps={{ underlineColor: "yellow" }}
                    Icon={() => {
                      return (
                        <Ionicons
                          name="caret-down"
                          size={15}
                          style={theme.dropDownIcon}
                        />
                      );
                    }}
                  />
                </View>
              </View>

              {/* Job Sector Filter  */}
              <View style={theme.dropDownContainer}>
                <Text style={theme.text}>Job Sector</Text>
                <View style={theme.dropDownInput}>
                  <RNPickerSelect
                    placeholder={{
                      label: "Select job sector...",
                      value: null,
                    }}
                    onValueChange={(value) => setJobSectorFilter(value)}
                    items={jobSectorOptions}
                    style={{
                      iconContainer: {
                        top: 10,
                        right: 12,
                      },
                    }}
                    value={jobSectorFilter}
                    useNativeAndroidPickerStyle={false}
                    textInputProps={{ underlineColor: "yellow" }}
                    Icon={() => {
                      return (
                        <Ionicons
                          name="caret-down"
                          size={15}
                          style={theme.dropDownIcon}
                        />
                      );
                    }}
                  />
                </View>
              </View>

              {/* Job Location Filter  */}
              <View style={theme.dropDownContainer}>
                <Text style={theme.text}>Job Location</Text>
                <View style={theme.dropDownInput}>
                  <TextInput
                    placeholder="Enter job location..."
                    placeholderTextColor={theme.inputPlaceholderColor}
                    value={jobLocationFilter}
                    autoCapitalize="words"
                    onChangeText={setJobLocationFilter}
                  />
                </View>
              </View>

              {/* Mother Tongue Filter  */}

              <View style={theme.dropDownContainer}>
                <Text style={theme.text}>Mother Tongue</Text>
                <View style={theme.dropDownInput}>
                  <RNPickerSelect
                    placeholder={{
                      label: "Select Mother Tongue",
                      value: null,
                    }}
                    onValueChange={(value) => setMotherTongueFilter(value)}
                    items={motherTongueOptions}
                    style={{
                      iconContainer: {
                        top: 10,
                        right: 12,
                      },
                    }}
                    value={motherTongueFilter}
                    useNativeAndroidPickerStyle={false}
                    textInputProps={{ underlineColor: "yellow" }}
                    Icon={() => {
                      return (
                        <Ionicons
                          name="caret-down"
                          size={15}
                          style={theme.dropDownIcon}
                        />
                      );
                    }}
                  />
                </View>
              </View>

              {/* Eating Habits */}
              <View style={theme.dropDownContainer}>
                <Text style={theme.text}>Eating Habits</Text>
                <View style={theme.dropDownInput}>
                  <RNPickerSelect
                    placeholder={{
                      label: "Select eating habits",
                      value: null,
                    }}
                    onValueChange={(value) => setEatingHabitsFilter(value)}
                    items={eatingHabitsOptions}
                    style={{
                      iconContainer: {
                        top: 10,
                        right: 12,
                      },
                    }}
                    value={eatingHabitsFilter}
                    useNativeAndroidPickerStyle={false}
                    textInputProps={{ underlineColor: "yellow" }}
                    Icon={() => {
                      return (
                        <Ionicons
                          name="caret-down"
                          size={15}
                          style={theme.dropDownIcon}
                        />
                      );
                    }}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={theme.primaryButton}
                onPress={handleFilterClick}
              >
                <Text style={theme.primaryButtonText}>Apply Filter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={theme.secondaryButton}
                onPress={handleResetClick}
              >
                <Text style={theme.secondaryButtonText}>Reset Filter</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>
      </Portal>
    </View>
  );
};

export default Filter;
