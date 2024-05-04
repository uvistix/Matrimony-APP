import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { db } from "../../firebaseConfig/FirebaseConfig";
import { useAuth } from "../../authContext/AuthContext";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import theme from "../../themeProvider/ThemeProvider";
import Pagination from "../../components/Pagination";
import SplashScreen from "../../components/SplashScreen";
import RequestsProfileInfo from "../../components/RequestsProfileInfo";
import Toast from "react-native-simple-toast";
import { userExists, removeDocument } from "../../utils/utils"

const ITEMS_PER_PAGE = 50;

const SavedProfiles = () => {
  const [savedProfiles, setSavedProfiles] = useState([]);
  const { user } = useAuth();
  const flatListRef = useRef();
  const navigation = useNavigation();

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profileSaveRef = db
      .collection("savedProfiles")
      .where("senderId", "==", user.uid);

    const unsubscribe = profileSaveRef.onSnapshot(async (querySnapshot) => {
      const updatedSavedProfiles = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const receiverId = doc.data().receiverId;

          if (await userExists(receiverId)) {
            const receiverDataSnapshot = await db
              .collection("users")
              .doc(receiverId)
              .get();
            const receiverData = receiverDataSnapshot.data();

            return {
              id: doc.id,
              ...doc.data(),
              uid: receiverId,
              data: receiverData,
            };
          } else {
            await removeDocument("savedProfiles", doc.id);
            return null;
          }
        })
      );

      const filteredSavedProfiles = updatedSavedProfiles.filter(Boolean);

      filteredSavedProfiles.sort((a, b) => b.timestamp - a.timestamp);
      setSavedProfiles(filteredSavedProfiles);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [user.uid]);


  const handleCancelRequest = async (requestId) => {
    try {
      await db.collection("savedProfiles").doc(requestId).delete();

      // Update the local state to reflect the changes
      setSavedProfiles((prevProfiles) =>
        prevProfiles.filter((profile) => profile.id !== requestId)
      );
    } catch (error) {
      Toast.show("Error removing saved profile. Try again", Toast.SHORT);
    }
  };

  const handleProfileView = (index) => {
    navigation.navigate("OtherStack", {
      screen: "Saved Profile",
      params: {
        selectedItem: savedProfiles,
        selectedIndex: index,
      },
    });
  };


   // Function to scroll to top when page changes
   const scrollToTop = () => {
     flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
   };

   const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };


  if (savedProfiles.length === 0) {
    return (
      <View style={theme.mainContainer}>
        <Header title="Saved List" />
        <View style={theme.flexView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={theme.contentArea}>
              <View style={theme.heroblockImageContainer}>
                <Image
                  source={require("../../../assets/no-profile-saved.png")}
                  style={theme.heroblockImage}
                />
              </View>
              <View style={theme.noRequestsContainer}>
                <SplashScreen visible={loading} />
                <Text style={theme.noRequestsText}>No saved profiles</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View style={theme.mainContainer}>
      <Header title="Saved List" />
      <View style={theme.flexView}>
        <View style={theme.contentArea}>
          <FlatList
          ref={flatListRef}
            data={savedProfiles.slice(startIndex, endIndex)}
            keyExtractor={(item) => item.timestamp.toDate().toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={item.data.id}
                style={theme.requestsProfile}
                onPress={() => handleProfileView(index)}
              >
                <View style={theme.requestsProfileContainer}>
                  <RequestsProfileInfo userData={item.data} theme={theme} />

                  {/* Button Row */}

                  <View style={theme.requestsProfileContainer}>
                    {/* Button 1 */}

                    <TouchableOpacity
                      style={theme.requestSecondaryButton}
                      onPress={() => handleProfileView(index)}
                    >
                      <Text style={theme.requestSecondaryButtonText}>
                        View Profile
                      </Text>
                    </TouchableOpacity>

                    {/* Button 2 */}

                    <TouchableOpacity
                      style={theme.requestPrimaryButton}
                      onPress={() => handleCancelRequest(item.id)}
                    >
                      <Text style={theme.requestPrimaryButtonText}>
                        Remove Profile
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ListFooterComponent={
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(savedProfiles.length / ITEMS_PER_PAGE)}
                onPageChange={handlePageChange}
              />
            }
          />
        </View>
      </View>
    </View>
  );
};

export default SavedProfiles;
