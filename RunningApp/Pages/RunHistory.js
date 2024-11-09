import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_DB } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const RunHistory = () => {
  const [history, setHistory] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchHistory = async () => {
      const querySnapshot = await getDocs(
        collection(FIREBASE_DB, "runHistory")
      );
      const historyData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistory(historyData);
    };

    fetchHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Run History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.historyItem}
            onPress={() =>
              navigation.navigate("RunHistoryDetail", { runId: item.id })
            }
          >
            <Text>
              Date: {new Date(item.date.seconds * 1000).toLocaleString()}
            </Text>
            <Text>Distance: {item.distance.toFixed(2)} km</Text>
            <Text>Duration: {(item.duration / 60).toFixed(2)} min</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  historyItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
});

export default RunHistory;
