// RequestsHandler.js

import { useEffect } from "react";
import { db } from "../firebaseConfig/FirebaseConfig";
import { userExists, removeDocument } from "../utils/utils"
import Toast from "react-native-simple-toast";

const useRequestsHandler = (
  user,
  setRequestsReceived,
  setRequestsSent,
  setLoading
) => {
  useEffect(() => {
    const receivedRef = db
      .collection("contactRequests")
      .where("receiverId", "==", user.uid);

    const sentRef = db
      .collection("contactRequests")
      .where("senderId", "==", user.uid);

    const unsubscribeReceived = receivedRef.onSnapshot(async (snapshot) => {
      try {
        const receivedData = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const senderId = doc.data().senderId;

            // Check if the senderId exists in the "users" collection
            if (await userExists(senderId)) {
              const senderDataSnapshot = await db
                .collection("users")
                .doc(senderId)
                .get();
              const senderData = senderDataSnapshot.data();

              return { id: doc.id, ...doc.data(), senderData };
            } else {
              // Handle the case where the user does not exist
              await removeDocument("contactRequests", doc.id);
              return null;
            }
          })
        );

        // Filter out null values before setting state
        const filteredReceivedData = receivedData.filter(Boolean);

        filteredReceivedData.sort((a, b) => b.timestamp - a.timestamp);
        setRequestsReceived(filteredReceivedData);
      } catch (error) {
        Toast.show("Error fetching received data, Please check your Internet connection and restart app", Toast.SHORT);
        // Handle the error as needed, e.g., show a user-friendly message
      }
    });

    const unsubscribeSent = sentRef.onSnapshot(async (sentSnapshot) => {
      try {
        const sentData = await Promise.all(
          sentSnapshot.docs.map(async (doc) => {
            const receiverId = doc.data().receiverId;

            // Check if the receiverId exists in the "users" collection
            if (await userExists(receiverId)) {
              const receiverDataSnapshot = await db
                .collection("users")
                .doc(receiverId)
                .get();
              const receiverData = receiverDataSnapshot.data();

              return { id: doc.id, ...doc.data(), receiverData };
            } else {
              // Handle the case where the user does not exist
              await removeDocument("contactRequests", doc.id);
              return null;
            }
          })
        );

        // Filter out null values before setting state
        const filteredSentData = sentData.filter(Boolean);

        filteredSentData.sort((a, b) => b.timestamp - a.timestamp);
        setRequestsSent(filteredSentData);
        setLoading(false);
      } catch (error) {
        Toast.show("Error fetching sent data, Please check your Internet connection and restart app", Toast.SHORT);
        // Handle the error as needed, e.g., show a user-friendly message
      }
    });

    return () => {
      unsubscribeReceived();
      unsubscribeSent();
    };
  }, [user.uid]);
};
export default useRequestsHandler;
