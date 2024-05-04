import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  Image,
  ScrollView,
} from "react-native";
import { useAuth } from "../../authContext/AuthContext";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import theme from "../../themeProvider/ThemeProvider";
import SortingButtons from "../../components/SortingButtons";
import useRequestsHandler from "../../components/RequestsHandler";
import RequestsProfileInfo from "../../components/RequestsProfileInfo";
import {
  isRequestRejected,
  isRequestAccepted,
  isRequestSent,
} from "../../components/RequestHelpers";
import {
  handleCancelSentRequest,
  handleRequestAgainCancel,
  handleRequestAgain,
  handleSentProfileView,
} from "../../components/RequestActionHandler";
import Pagination from "../../components/Pagination";
import SplashScreen from "../../components/SplashScreen";

const ITEMS_PER_PAGE = 50;

const SentRequestsList = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const flatListRef = useRef();

  const [sortCriteria, setSortCriteria] = useState("all");
  const [requestsReceived, setRequestsReceived] = useState([]);
  const [requestsSent, setRequestsSent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const [loading, setLoading] = useState(true);

  useRequestsHandler(user, setRequestsReceived, setRequestsSent, setLoading);



  useEffect(() => {
    setCurrentPage(1);
  }, [sortCriteria]);

  const filteredRequests = requestsSent.filter((item) => {
    if (sortCriteria === "all") {
      return true;
    } else {
      return item.status === sortCriteria;
    }
  });



   // Function to scroll to top when page changes
   const scrollToTop = () => {
     flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
   };

   const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  if (requestsSent.length === 0) {
    return (
      <View style={theme.mainContainer}>
        <Header title="Sent Requests" />
        <View style={theme.flexView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={theme.contentArea}>
              <View style={theme.heroblockImageContainer}>
                <Image
                  source={require("../../../assets/no-data-sent.png")}
                  style={theme.heroblockImage}
                />
              </View>
              <View style={theme.noRequestsContainer}>
                <SplashScreen visible={loading} />
                <Text style={theme.noRequestsText}>No requests sent</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
  if (filteredRequests.length === 0) {
    return (
      <View style={theme.mainContainer}>
        <Header title="Sent Requests" />
        <SortingButtons
          sortCriteria={sortCriteria}
          setSortCriteria={setSortCriteria}
        />
        <View style={theme.flexView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={theme.contentArea}>
              <View style={theme.heroblockImageContainer}>
                <Image
                  source={require("../../../assets/no-data-sent.png")}
                  style={theme.heroblockImage}
                />
              </View>
              <View style={theme.noRequestsContainer}>
                <SplashScreen visible={loading} />
                <Text style={theme.noRequestsText}>No {sortCriteria} data</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View style={theme.mainContainer}>
      <Header title="Sent Requests" />
      {/* Sorting Buttons */}
      <SortingButtons
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
      />

      {/* FlatList with filtered data */}
      <View style={theme.flexView}>
        <View style={theme.contentArea}>
          <FlatList
          ref={flatListRef}
            data={filteredRequests.slice(startIndex, endIndex)}
            keyExtractor={(item) => item.timestamp.toDate().toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.receiverData.id}
                style={theme.requestsProfile}
                onPress={() =>
                  handleSentProfileView(
                    navigation,
                    requestsSent,
                    requestsSent.indexOf(item)
                  )
                }
              >
                <View style={theme.requestsProfileContainer}>
                  <RequestsProfileInfo
                    userData={item.receiverData}
                    status={item.status}
                    theme={theme}
                  />
                  {/* Button Row */}
                  <View style={theme.requestsProfileContainer}>
                    {/* Button 1 */}
                    <TouchableOpacity
                      style={theme.requestSecondaryButton}
                      onPress={() =>
                        handleSentProfileView(
                          navigation,
                          requestsSent,
                          requestsSent.indexOf(item)
                        )
                      }
                    >
                      <Text style={theme.requestSecondaryButtonText}>
                        View Profile
                      </Text>
                    </TouchableOpacity>

                    {/* Button 2 */}
                    {isRequestSent(
                      item,
                      requestsReceived,
                      requestsSent,
                      true
                    ) && (
                      <TouchableOpacity
                        style={theme.requestPrimaryButton}
                        onPress={() => {
                          if (item.status === "requested again") {
                            handleRequestAgainCancel(item.id);
                          } else {
                            handleCancelSentRequest(item.id);
                          }
                        }}
                      >
                        <Text style={theme.requestPrimaryButtonText}>
                          Cancel Request
                        </Text>
                      </TouchableOpacity>
                    )}
                    {isRequestRejected(
                      item,
                      requestsReceived,
                      requestsSent,
                      true
                    ) && (
                      <TouchableOpacity
                        style={theme.requestPrimaryButton}
                        onPress={() => {
                          if (item.status === "request rejected") {
                            handleRequestAgain(item.id);
                          }
                        }}
                      >
                        <Text style={theme.requestPrimaryButtonText}>
                          Request Again
                        </Text>
                      </TouchableOpacity>
                    )}
                    {isRequestAccepted(
                      item,
                      requestsReceived,
                      requestsSent,
                      true
                    ) && (
                      <TouchableOpacity
                        style={theme.requestPrimaryButton}
                        onPress={() => {
                          Linking.openURL(`tel:${item.receiverData.number}`);
                        }}
                      >
                        <Text style={theme.requestPrimaryButtonText}>
                          Call Now
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ListFooterComponent={
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredRequests.length / ITEMS_PER_PAGE)}
                onPageChange={handlePageChange}
              />
            }
          />
        </View>
      </View>
    </View>
  );
};

export default SentRequestsList;
