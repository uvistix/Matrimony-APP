// SubscriptionContext.js

import React, { createContext, useState, useContext, useEffect } from "react";
import { Alert } from "react-native";
import { db } from "../firebaseConfig/FirebaseConfig"; 
import { useAuth } from "../authContext/AuthContext";
import Toast from "react-native-simple-toast";


const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [isSubscribed, setSubscribed] = useState(false);
  const [expiryDate, setExpiryDate] = useState(null);
  const { user, userData } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        setLoading(true)
        // Check if the user is logged in
        if (user) {
          const userDoc = await db
            .collection("users")
            .doc(user.uid)
            .get();

         
          const userSubscriptionExpiry = userDoc.data()?.subscriptionExpiry;

          const isSubscriptionActive =
            userSubscriptionExpiry &&
            new Date() < new Date(userSubscriptionExpiry);
          setSubscribed(isSubscriptionActive);
        }
      } catch (error) {
        Toast.show("Error checking subscription status! Please check your Internet connection and try again", Toast.SHORT);
      }finally{
        setLoading(false)
      }
    };
    checkSubscriptionStatus();
  }, [user && userData]);

  const subscribe = async () => {
    try {
      setLoading(true)
      if (user) {
        // Set the expiry date to 30 days from now
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

        // Update the user document with the new subscription expiry date
        await db.collection("users").doc(user.uid).update({
          subscriptionExpiry: thirtyDaysFromNow.toISOString(),
        });

        setExpiryDate(thirtyDaysFromNow.toISOString());
        setSubscribed(true);
        Alert.alert(
          "Subscription Activated",
          "Thank you for subscribing! Your subscription has been successfully activated for 30 days."
        );
      }
    } catch (error) {
      Toast.show("Error subscribing! Please try again", Toast.SHORT);
    } finally{
      setLoading(false)
    }
  };

  const unsubscribe = async () => {
    try {
      if (user) {
        // Remove the subscription expiry date from the user document
        await db.collection("users").doc(user.uid).update({
          subscriptionExpiry: null,
        });

        setExpiryDate(null);
        setSubscribed(false);
      }
    } catch (error) {
      console.error("Error unsubscribing:", error);
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{ isSubscribed, subscribe, unsubscribe, loading}}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider"
    );
  }
  return context;
};
