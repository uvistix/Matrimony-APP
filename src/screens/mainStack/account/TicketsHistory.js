import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ScrollView } from "react-native";
import { db } from "../../../firebaseConfig/FirebaseConfig";
import theme from "../../../themeProvider/ThemeProvider";
import { useAuth } from "../../../authContext/AuthContext";
import SplashScreen from "../../../components/SplashScreen";
import Toast from "react-native-simple-toast";

const TicketsHistory = () => {
  const { userData } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = db
      .collection("contactForms")
      .where("uid", "==", userData.uid)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        try {
          const ticketList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setTickets(ticketList);
        } catch (error) {
          Toast.show("Error!", "Failed to fetch recent tickets., Please check your Internet connection and try again", Toast.SHORT);
        } finally {
          setLoading(false);
        }
      });

    // Cleanup the subscription when the component is unmounted
    return () => unsubscribe();
  }, [userData.uid]);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  if (tickets.length === 0) {
    return (
      <View style={theme.mainContainer}>
        <View style={theme.flexView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={theme.contentArea}>
              <View style={theme.heroblockImageContainer}>
                <Image
                  source={require("../../../../assets/no-data-sent.png")}
                  style={theme.heroblockImage}
                />
              </View>
              <View style={theme.noRequestsContainer}>
                <SplashScreen visible={loading} />
                <Text style={theme.noRequestsText}>No tickets history</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View style={theme.mainContainer}>
      <View style={theme.flexView}>
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.timestamp.toString()}
          renderItem={({ item }) => (
            <View style={theme.card}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 10,
                }}
              >
                <Text
                  style={[theme.text,{
                    color:
                      item.status && item.status == "Resolved"
                        ? "green"
                        : theme.primaryColor,
                  }]}
                >
                  Status: {item.status ?? ""}
                </Text>
                <Text style={theme.text}>
                  Ticket ID: {item.ticketId ? `#${item.ticketId}` : ""}
                </Text>
              </View>
              <View style={theme.input}>
                <Text style={[theme.text,{ marginVertical: 10, }]}>
                  Subject: {item.subject ?? ""}
                </Text>
                <Text style={[theme.text,{ marginVertical: 10,  }]}>
                  Message: {item.message ?? ""}
                </Text>
                <Text
                  style={{
                    textAlign: "right",
                    marginTop: 10,
                    borderTopWidth: 0.5,
                    borderColor:theme.inputPlaceholderColor,
                    paddingTop: 10,
                  }}
                >
                  {item.timestamp.toDate().toLocaleString(undefined, options)}
                </Text>
              </View>
              {item.response && (
                <View style={theme.input}>
                <Text >Admin: {item.response ?? ""}</Text>
                </View>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default TicketsHistory;
