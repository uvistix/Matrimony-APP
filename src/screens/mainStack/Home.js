import React, { useState, useEffect, useMemo, useRef } from "react";
import { View, FlatList, Text } from "react-native";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig/FirebaseConfig";
import Header from "../../components/Header";
import Filter from "../../components/Filter";
import theme from "../../themeProvider/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../authContext/AuthContext";
import Pagination from "../../components/Pagination";
import SplashScreen from "../../components/SplashScreen";
import Toast from "react-native-simple-toast";
import ImagePickerComponent from "../../components/ImagePicker";
import { Modal } from "react-native-paper";
import ProfileItem from "../../components/HomeProfileItem";
import { calculateAge } from "../../utils/utils";

const ITEMS_PER_PAGE = 50;

const Home = () => {
  const { user, userData } = useAuth();
  const flatListRef = useRef();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const [selectedFilters, setSelectedFilters] = useState({
    ageFilter: "",
    heightFilter: "",
    maritalStatusFilter: "",
    educationFilter: "",
    jobSectorFilter: "",
    jobLocationFilter: "",
    motherTongueFilter: "",
    eatingHabitsFilter: "",
  });

  useEffect(() => {
    const updateProfileStatus = async () => {
      if (!userData.profileStatus) {
        navigation.navigate("AccountStack", {
          screen: "ProfileEdit",
        });
      }
    };

    updateProfileStatus();
  }, [user.uid, userData.profileStatus]);

  useEffect(() => {
    if (!userData.profileImage) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [userData.profileStatus, userData.profileImage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const unsub = onSnapshot(
          userData.gender === "Male"
            ? query(
                collection(db, "users"),
                orderBy("createdAt", "desc"),
                where("gender", "==", "Female"),
                where("profileStatus", "==", true)
              )
            : userData.gender === "Female"
            ? query(
                collection(db, "users"),
                orderBy("createdAt", "desc"),
                where("gender", "==", "Male"),
                where("profileStatus", "==", true)
              )
            : query(collection(db, "users"), orderBy("createdAt", "desc")),
          (querySnapshot) => {
            const fetchedData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setData(fetchedData);
          },
          (error) => {
            Toast.show(
              "Error fetching data, check your Internet connection and restart app",
              Toast.SHORT
            );
          }
        );

        return () => {
          if (unsub) {
            unsub();
          }
        };
      } catch (error) {
        Toast.show(
          "Error fetching data, check your Internet connection and restart app",
          Toast.SHORT
        );
      }
    };

    const initialize = async () => {
      try {
        setLoading(true);
        await fetchData();
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, [userData]);

  const applyFilters = (item) => {
    const {
      ageFilter,
      heightFilter,
      maritalStatusFilter,
      educationFilter,
      jobSectorFilter,
      jobLocationFilter,
      motherTongueFilter,
      eatingHabitsFilter,
      searchFilter,
    } = selectedFilters;

    const itemAge = calculateAge(item.dobYear);

    const checkAgeFilter = (itemAge) => {
      if (!ageFilter) {
        return true;
      }

      const [minAge, maxAge] = ageFilter.split("-");

      return (
        (!minAge || itemAge >= parseInt(minAge)) &&
        (!maxAge || itemAge <= parseInt(maxAge))
      );
    };

    const checkHeightFilter = (itemHeightRange) => {
      if (!heightFilter) {
        return true;
      }

      const [minHeight, maxHeight] = heightFilter.split("-");

      return (
        (!minHeight || itemHeightRange >= parseInt(minHeight)) &&
        (!maxHeight || itemHeightRange <= parseInt(maxHeight))
      );
    };

    const checkFilter = (filterValue, itemValue) => {
      return !filterValue || itemValue === filterValue;
    };

    const checkProfileImage = (profileImage) => {
      return profileImage;
    };

    return (
      checkAgeFilter(parseInt(itemAge)) &&
      checkHeightFilter(parseInt(item.height)) &&
      // (userData.userType == "user"
      //   ? checkProfileImage(item.profileImage)
      //   : true) &&
      checkFilter(maritalStatusFilter, item.maritalStatus) &&
      checkFilter(educationFilter, item.education) &&
      checkFilter(jobSectorFilter, item.jobSector) &&
      checkFilter(jobLocationFilter, item.jobLocation) &&
      checkFilter(motherTongueFilter, item.motherTongue) &&
      checkFilter(eatingHabitsFilter, item.eatingHabits) &&
      (!searchFilter ||
        item?.name?.toLowerCase()?.includes(searchFilter.toLowerCase()) ||
        item?.id
          ?.toString()
          ?.toLowerCase()
          ?.includes(searchFilter.toLowerCase()))
    );
  };

  const handleProfilePress = (item) => {
    const filteredData = data.filter((filteredItem) =>
      applyFilters(filteredItem)
    );

    navigation.navigate("OtherStack", {
      screen: "Profile Details",
      params: {
        selectedItem: filteredData,
        selectedIndex: filteredData.indexOf(item),
      },
    });
  };

  const defaultFilters = {
    ageFilter: "",
    heightFilter: "",
    maritalStatusFilter: "",
    educationFilter: "",
    jobSectorFilter: "",
    jobLocationFilter: "",
    motherTongueFilter: "",
    eatingHabitsFilter: "",
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => applyFilters(item));
  }, [data, selectedFilters]);

  // Function to scroll to top when page changes
  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  return (
    <View style={theme.mainContainer}>
      <Header title="Home" />
      <SplashScreen visible={loading} />
      <Filter
        selectedFilters={selectedFilters}
        onFilter={(filters) => setSelectedFilters(filters)}
        onReset={() => setSelectedFilters(defaultFilters)}
      />
      <View style={theme.flexView}>
        <View style={theme.contentArea}>
          <FlatList
            ref={flatListRef}
            data={filteredData.slice(startIndex, endIndex)}
            keyExtractor={(item) => item.uid.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ProfileItem
                item={item}
                onPress={() => handleProfilePress(item)}
              />
            )}
            // ListHeaderComponent={}
            ListFooterComponent={
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(
                  data.filter((item) => applyFilters(item)).length /
                    ITEMS_PER_PAGE
                )}
                onPageChange={handlePageChange}
              />
            }
          />
        </View>
      </View>
      <Modal animationType="slide" visible={modalVisible}>
        <View>
          <View style={theme.card}>
            <ImagePickerComponent
              user={user}
              setProfileImage={setProfileImage}
              theme={theme}
              profileImage={profileImage}
            />
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              Update Profile Picture
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;
