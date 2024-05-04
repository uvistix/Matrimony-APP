import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../firebaseConfig/FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GOOGLE_WEB_CLIENT_ID } from "@env";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // Function to store user data in local storage
  const storeUserDataLocally = async (authUser) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(authUser));
    } catch (error) {
      console.error("Error storing user data locally:", error);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
    });
  }, []);

  const signOut = async () => {
    try {
      await auth.signOut();
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      Toast.show("Error signing out, Please try again", Toast.SHORT);
    }
  };

  useEffect(() => {
    const checkStoredUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser) {
            setUser(parsedUser);
          }
        }
      } catch (error) {
        console.error("Error checking stored user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkStoredUser();

    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      try {
        if (authUser) {
          try {
            const userDoc = await db
              .collection("users")
              .doc(authUser.uid)
              .get();
            if (userDoc.exists) {
              await storeUserDataLocally(authUser);
              setUser(authUser);
            } else {
              signOut();
            }
          } catch {
            setUser(null);
            Toast.show(
              "Error fetching data, check your Internet connection and restart app",
              Toast.SHORT
            );
          }
        }
      } catch (error) {
        console.error("Error handling auth state change:", error);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    let unsubscribeUser;

    const fetchUserData = async () => {
      setIsLoading(true);
      if (user) {
        try {
          const userQuery = db.collection("users").where("uid", "==", user.uid);

          const [userSnapshot] = await Promise.all([userQuery.get()]);

          if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();
            setUserData(userData);
          } else {
            Toast.show(
              "Error fetching data, check your Internet connection and restart app",
              Toast.SHORT
            );
          }

          // Add Firestore listener to user data
          const userRef = db.collection("users").doc(user.uid);

          unsubscribeUser = userRef.onSnapshot(
            (doc) => {
              if (doc.exists) {
                const updatedUserData = doc.data();
                setUserData(updatedUserData);
              }
            },
            (error) => {
              Toast.show(
                "Error fetching data, check your Internet connection and restart app",
                Toast.SHORT
              );
            }
          );
        } catch (error) {
          Toast.show(
            "Error fetching data, check your Internet connection and restart app",
            Toast.SHORT
          );
        } finally {
          setIsLoading(false);
        }
      } else {
        setUserData(null);
        setIsLoading(false);
      }
    };

    fetchUserData();

    // Cleanup subscriptions when component unmounts or user changes
    return () => {
      if (unsubscribeUser) {
        unsubscribeUser();
      }
    };
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userData,
        isLoading,
        storeUserDataLocally,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
