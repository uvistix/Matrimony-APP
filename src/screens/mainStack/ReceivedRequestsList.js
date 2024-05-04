import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useAuth } from "../../authContext/AuthContext";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import theme from "../../themeProvider/ThemeProvider";
import SortingButtons from "../../components/SortingButtons";
import useRequestsHandler from "../../components/RequestsHandler";
import RequestsProfileInfo from "../../components/RequestsProfileInfo";
import {
  isRequestAccepted,
  isRequestReceived,
} from "../../components/RequestHelpers";
import {
  handleAcceptRequest,
  handleRejectReceivedRequest,
  handleReceivedProfileView,
  handleCallRequester,
} from "../../components/RequestActionHandler";
import Pagination from "../../components/Pagination";
import SplashScreen from "../../components/SplashScreen";

const ITEMS_PER_PAGE = 50;

const Requests = () => {
  const [requestsReceived, setRequestsReceived] = useState([]);
  const [requestsSent, setRequestsSent] = useState([]);
  const { user } = useAuth();
  const flatListRef = useRef();
  const navigation = useNavigation();
 
  const [sortCriteria, setSortCriteria] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const [loading, setLoading] = useState(true);

  useRequestsHandler(user, setRequestsReceived, setRequestsSent, setLoading);


  useEffect(() => {
    setCurrentPage(1);
  }, [sortCriteria]);

  const filteredRequests = requestsReceived.filter((item) => {
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

  if (requestsReceived.length === 0) {
    return (
      <View style={theme.mainContainer}>
        <Header title="Received Requests" />
        <View style={theme.flexView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={theme.contentArea}>
              <View style={theme.heroblockImageContainer}>
                <Image
                  source={require("../../../assets/no-data-received.png")}
                  style={theme.heroblockImage}
                />
              </View>
              <View style={theme.noRequestsContainer}>
                <SplashScreen visible={loading} />
                <Text style={theme.noRequestsText}>No requests received</Text>
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
        <Header title="Received Requests" />
        <SortingButtons
          sortCriteria={sortCriteria}
          setSortCriteria={setSortCriteria}
        />
        <View style={theme.flexView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={theme.contentArea}>
              <View style={theme.heroblockImageContainer}>
              <Image
                  source={require("../../../assets/no-data-received.png")}
                  style={theme.heroblockImage}
                />
              </View>
              <View style={theme.noRequestsContainer}>
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
      <View>
        <Header title="Received Requests" />
      </View>
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
                key={item.senderData.id}
                style={theme.requestsProfile}
                onPress={() =>
                  handleReceivedProfileView(
                    navigation,
                    requestsReceived,
                    requestsReceived.indexOf(item)
                  )
                }
              >
                <View style={theme.requestsProfileContainer}>
                  <RequestsProfileInfo
                    userData={item.senderData}
                    status={item.status}
                    theme={theme}
                  />
                  {/* Button Row */}
                  <View style={theme.requestsProfileContainer}>
                    {/* Button 1 */}
                    {!isRequestReceived(
                      item,
                      requestsReceived,
                      requestsSent,
                      false
                    ) && (
                      <TouchableOpacity
                        style={theme.requestSecondaryButton}
                        onPress={() =>
                          handleReceivedProfileView(
                            navigation,
                            requestsReceived,
                            requestsReceived.indexOf(item)
                          )
                        }
                      >
                        <Text style={theme.requestSecondaryButtonText}>
                          View Profile
                        </Text>
                      </TouchableOpacity>
                    )}
                    {/* Button 2 */}
                    {isRequestReceived(
                      item,
                      requestsReceived,
                      requestsSent,
                      false
                    ) && (
                      <>
                        <TouchableOpacity
                          style={theme.requestSecondaryButton}
                          onPress={() => {
                            handleRejectReceivedRequest(
                              item.id,
                              item.senderData.uid
                            );
                          }}
                        >
                          <Text style={theme.requestSecondaryButtonText}>
                            Reject Request
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={theme.requestPrimaryButton}
                          onPress={() =>
                            handleAcceptRequest(item.id, requestsSent, item)
                          }
                        >
                          <Text style={theme.requestPrimaryButtonText}>
                            Accept Request
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}

                    {isRequestAccepted(
                      item,
                      requestsReceived,
                      requestsSent,
                      false
                    ) && (
                      <TouchableOpacity
                        style={theme.requestPrimaryButton}
                        onPress={() => {
                          handleCallRequester(item.senderData.number);
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

export default Requests;
