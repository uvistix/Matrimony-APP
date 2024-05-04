import { db } from "./../firebaseConfig/FirebaseConfig";
import { Text } from "react-native";

// RequestsHandler & SavedProfilesList
export const userExists = async (uid) => {
  const userDoc = await db.collection("users").doc(uid).get();
  return userDoc.exists;
};

export const removeDocument = async (collection, docId) => {
  await db.collection(collection).doc(docId).delete();
};

export const calculateAge = (dobYear) => {
  if (dobYear) {
    const birthYear = dobYear;
    const currentYear = new Date().getFullYear();
    const calculatedAge = currentYear - birthYear;
    return calculatedAge.toString();
  }

  return "";
};

export const mapHeightToString = (height) => {
  const feet = Math.floor(height / 30.48); // 1 foot = 30.48 cm
  const inches = Math.round((height % 30.48) / 2.54);

  return `${feet}'${inches}" ft - ${height} cm`;
};

export const requestStatus = (status, userId) => {
  if (status === "request pending") {
    return (
      <Text style={{ textAlign: "right", fontWeight: "bold",  }}>Pending</Text>)
  } else if (status === "request accepted") {
    return <Text style={{ textAlign: "right", fontWeight: "bold", color: "green" }}>Accepted</Text>
  } else if (status === "request rejected") {
    return <Text style={{ textAlign: "right", fontWeight: "bold", color: "#C51E3A" }}>Rejected</Text>
  } else if (status === "requested again") {
    return <Text style={{ textAlign: "right", fontWeight: "bold", color: "#FF4F00" }}>Req. Again</Text>
  } else {
    return <Text style={{ textAlign: "right", fontWeight: "bold",}}>{userId}</Text>
  }
};
