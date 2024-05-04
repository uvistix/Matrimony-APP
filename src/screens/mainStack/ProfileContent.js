import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Linking } from "react-native";
import { db } from "../../firebaseConfig/FirebaseConfig";
import { useAuth } from "../../authContext/AuthContext";
import theme from "../../themeProvider/ThemeProvider";
import { useSubscription } from "../../authContext/SubscriptionContext";
import ProfileContentInfo from "../../components/ProfileContentInfo";
import ProfileContentButtons from "../../components/ProfileContentButtons";
import Toast from "react-native-simple-toast";

const ProfileDetails = ({ selectedItem, selectedIndex, item, source }) => {
  const { user, userData } = useAuth();
 
  const { isSubscribed, subscribe, loading } = useSubscription();

  const [isLoading, setIsLoading] = useState(true);
  const [currentItemIndex, setCurrentItemIndex] = useState(selectedIndex);
  const [currentItem, setCurrentItem] = useState(item);

  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isProfileSaved, setIsProfileSaved] = useState(false);

  const [requestsReceivedStatus, setRequestsReceivedStatus] = useState("");
  const [requestsSentStatus, setRequestsSentStatus] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const receivedRef = db
      .collection("contactRequests")
      .where("receiverId", "==", user.uid)
      .where("senderId", "==", currentItem.uid);

    const sentRef = db
      .collection("contactRequests")
      .where("senderId", "==", user.uid)
      .where("receiverId", "==", currentItem.uid);

    const profileSaveRef = db.collection("savedProfiles");

    const unsubscribeReceivedStatus = receivedRef.onSnapshot((snapshot) => {
      try {
        if (!snapshot.empty) {
          const receivedData = snapshot.docs[0].data();
          setRequestsReceivedStatus(receivedData.status);
        } else {
          setRequestsReceivedStatus("");
        }
      } catch (error) {
        Toast.show("Error fetching received data", Toast.SHORT);
      }
    });

    const unsubscribeSentStatus = sentRef.onSnapshot((sentSnapshot) => {
      try {
        if (!sentSnapshot.empty) {
          const sentData = sentSnapshot.docs[0].data();
          setRequestsSentStatus(sentData.status);
          setIsRequestSent(true);
        } else {
          setRequestsSentStatus("");
          setIsRequestSent(false);
        }
      } catch (error) {
        Toast.show("Error fetching sent data", Toast.SHORT);

      }
    });

    const profileSaveUnsubscribe = profileSaveRef
      .where("senderId", "==", user.uid)
      .where("receiverId", "==", currentItem.uid)
      .limit(1)
      .onSnapshot(async (snapshot) => {
        try {
          setIsProfileSaved(!snapshot.empty);
          setIsLoading(false);
        } catch (error) {
          Toast.show("Error fetching saved profile", Toast.SHORT);
        }
      });

    return () => {
      unsubscribeReceivedStatus();
      unsubscribeSentStatus();
      profileSaveUnsubscribe();
    };
  }, [selectedItem, currentItemIndex]);

  const handleBack = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        if (source === "profileDetails") {
          setCurrentItem(selectedItem[newIndex]);
        } else if (source === "requestReceivedProfile") {
          setCurrentItem(selectedItem[newIndex]?.senderData);
        } else if (source === "requestSentProfile") {
          setCurrentItem(selectedItem[newIndex]?.receiverData);
        } else if (source === "savedProfile") {
          setCurrentItem(selectedItem[newIndex]?.data);
        } else {
          setCurrentItem(selectedItem[newIndex]?.data);
        }
        return newIndex;
      });
    }
  };

  const handleForward = () => {
    if (currentItemIndex < selectedItem.length - 1) {
      setCurrentItemIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        if (source === "profileDetails") {
          setCurrentItem(selectedItem[newIndex]);
        } else if (source === "requestReceivedProfile") {
          setCurrentItem(selectedItem[newIndex]?.senderData);
        } else if (source === "requestSentProfile") {
          setCurrentItem(selectedItem[newIndex]?.receiverData);
        } else if (source === "savedProfile") {
          setCurrentItem(selectedItem[newIndex]?.data);
        } else {
          setCurrentItem(selectedItem[newIndex]?.data);
        }
        return newIndex;
      });
    }
  };

  const handleSaveProfile = async () => {
    try {
      const profileSaveRef = db.collection("savedProfiles");

      if (isProfileSaved) {
        const profileSaveExist = await profileSaveRef
          .where("senderId", "==", user.uid)
          .where("receiverId", "==", currentItem.uid)
          .get();

        profileSaveExist.forEach(async (doc) => {
          await doc.ref.delete();
        });

        setIsProfileSaved(false);
      } else {
        await profileSaveRef.add({
          receiverId: currentItem.uid,
          senderId: userData.uid,
          timestamp: new Date(),
        });

        setIsProfileSaved(true);
      }
    } catch (error) {
      Toast.show("Error action! Please try again", Toast.SHORT);
    }
  };

  const handleRequestAgain = async () => {
    try {
      await updateSentRequestStatus("requested again");
    } catch (error) {
      Toast.show("Error requesting contact! Please try again", Toast.SHORT);
    }
  };

  const handleRequestAgainCancel = async () => {
    try {
      await updateSentRequestStatus("request rejected");
    } catch (error) {
      Toast.show("Error cancelling request! Please try again", Toast.SHORT);
    }
  };

  const handleRequest = async () => {
    try {
      const contactRequestsRef = db.collection("contactRequests");
      if (!isSubscribed) {
        return Toast.show(
          "Please subscribe to request contact number!",
          Toast.SHORT
        );
      }

      if (isRequestSent) {
        const existingRequest = await contactRequestsRef
          .where("senderId", "==", user.uid)
          .where("receiverId", "==", currentItem.uid)
          .get();

        existingRequest.forEach(async (doc) => {
          await doc.ref.delete();
        });

        setIsRequestSent(false);
      } else {
        const newRequestRef = await contactRequestsRef.add({
          receiverId: currentItem.uid,
          senderId: user.uid,
          timestamp: new Date(),
          status: "request pending",
        });

        setIsRequestSent(true);
      }
    } catch (error) {
      Toast.show("Error action! Please try again", Toast.SHORT);
    }
  };
  const handleCall = async () => {
    Linking.openURL(`tel:${currentItem.number}`);
  };

  const updateSentRequestStatus = async (status) => {
    try {
      const contactRequestsRef = db.collection("contactRequests");
      const existingRequest = await contactRequestsRef
        .where("receiverId", "==", currentItem.uid)
        .where("senderId", "==", user.uid)
        .get();

      existingRequest.forEach(async (doc) => {
        await doc.ref.update({ status });
      });
    } catch (error) {
      Toast.show("Error action! Please try again", Toast.SHORT);
    }
  };

  const handleAcceptRequest = async () => {
    try {
      await updateReceivedRequestStatus("request accepted");

      if (requestsReceivedStatus) {
        const contactRequestsRef = db.collection("contactRequests");
        const existingRequest = await contactRequestsRef
          .where("senderId", "==", user.uid)
          .where("receiverId", "==", currentItem.uid)
          .get();

        existingRequest.forEach(async (doc) => {
          await doc.ref.update({ status: "request accepted" });
        });
      }
    } catch (error) {
      Toast.show("Error accepting request! Please try again", Toast.SHORT);
    }
  };

  const handleRejectRequest = async () => {
    try {
      await updateReceivedRequestStatus("request rejected");
    } catch (error) {
      Toast.show("Error rejecting request! Please try again", Toast.SHORT);
    }
  };

  const updateReceivedRequestStatus = async (status) => {
    try {
      const contactRequestsRef = db.collection("contactRequests");
      const existingRequest = await contactRequestsRef
        .where("receiverId", "==", user.uid)
        .where("senderId", "==", currentItem.uid)
        .get();

      existingRequest.forEach(async (doc) => {
        await doc.ref.update({ status });
      });
    } catch (error) {
      Toast.show("Error action! Please try again", Toast.SHORT);
    }
  };

  if (!currentItem) {
    return (
      <View>
        <Header title="Received Requests" />
        <View style={theme.noRequestsContainer}>
          <Text style={theme.noRequestsText}>No data available</Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <ProfileContentInfo
              currentItem={currentItem}
              theme={theme}
              requestsReceivedStatus={requestsReceivedStatus}
              requestsSentStatus={requestsSentStatus}
              userData={userData}
            />
          </View>
        </ScrollView>
      </View>

      <ProfileContentButtons
        handleBack={handleBack}
        handleForward={handleForward}
        isProfileSaved={isProfileSaved}
        handleSaveProfile={handleSaveProfile}
        handleAcceptRequest={handleAcceptRequest}
        handleRejectRequest={handleRejectRequest}
        handleCall={handleCall}
        handleRequest={handleRequest}
        handleRequestAgainCancel={handleRequestAgainCancel}
        handleRequestAgain={handleRequestAgain}
        isSubscribed={isSubscribed}
        isRequestSent={isRequestSent}
        requestsSentStatus={requestsSentStatus}
        selectedItem={selectedItem}
        currentItemIndex={currentItemIndex}
        setCurrentItemIndex={setCurrentItemIndex}
        source={source}
        isLoading={isLoading}
        theme={theme}
        requestsReceivedStatus={requestsReceivedStatus}
        subscribe={subscribe}
        userData={userData}
        loading={loading}
      />
    </View>
  );
};

export default ProfileDetails;
