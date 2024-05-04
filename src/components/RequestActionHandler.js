// RequestHandlers.js

import { db } from "../firebaseConfig/FirebaseConfig";
import { Linking } from "react-native";
import Toast from "react-native-simple-toast";

// Received Requests Page
const handleAcceptRequest = async (requestId, requestsSent, item) => {
  try {
    // Update the status in Firestore
    await db
      .collection("contactRequests")
      .doc(requestId)
      .update({ status: "request accepted" });

    if (requestsSent && requestsSent.length > 0) {
      const sentId = requestsSent.find(
        (sentItem) => sentItem.receiverData.uid === item.senderData.uid
      );
      if (sentId) {
        await db
          .collection("contactRequests")
          .doc(sentId.id)
          .update({ status: "request accepted" });
      }
    }
  } catch (error) {
    Toast.show("Error accepting request. Try again", Toast.SHORT);
  }
};

const handleRejectReceivedRequest = async (requestId, senderUid) => {
  try {
    // Update the status in Firestore
    await db
      .collection("contactRequests")
      .doc(requestId)
      .update({ status: "request rejected" });
  } catch (error) {
    Toast.show("Error rejecting request. Try again", Toast.SHORT);
  }
};

const handleReceivedProfileView = (navigation, requestedProfiles, index) => {
  navigation.navigate("OtherStack", {
    screen: "Received Request Profile",
    params: {
      selectedItem: requestedProfiles,
      selectedIndex: index,
    },
  });
};

const handleCallRequester = (number) => {
  Linking.openURL(`tel:${number}`);
};

// Sent Requests Page

const handleCancelSentRequest = async (requestId) => {
  try {
    // Delete the profile in Firestore
    await db.collection("contactRequests").doc(requestId).delete();
  } catch (error) {
    Toast.show("Error cancelling request. Try again", Toast.SHORT);
  }
};

const handleRequestAgainCancel = async (requestId) => {
  try {
    // Update the status in Firestore
    await db
      .collection("contactRequests")
      .doc(requestId)
      .update({ status: "request rejected" });
  } catch (error) {
    Toast.show("Error canceling request. Try again", Toast.SHORT);
  }
};
const handleRequestAgain = async (requestId) => {
  try {
    // Update the status in Firestore
    await db
      .collection("contactRequests")
      .doc(requestId)
      .update({ status: "requested again" });
  } catch (error) {
    Toast.show("Error! request again. Try again", Toast.SHORT);
  }
};

const handleSentProfileView = (navigation, sentProfiles, index) => {
  navigation.navigate("OtherStack", {
    screen: "Sent Request Profile",
    params: {
      selectedItem: sentProfiles,
      selectedIndex: index,
    },
  });
};

export {
  handleAcceptRequest,
  handleRejectReceivedRequest,
  handleReceivedProfileView,
  handleCallRequester,
  handleCancelSentRequest,
  handleRequestAgainCancel,
  handleRequestAgain,
  handleSentProfileView,
};
