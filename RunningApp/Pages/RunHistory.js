import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../config/firebaseConfig";

const RunHistory = ({ route }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { uid } = route.params; // Mendapatkan uid pengguna dari params

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Mengambil riwayat perjalanan dari Firestore
        const historyRef = collection(FIREBASE_DB, "users", uid, "history");
        const q = query(historyRef); // Query untuk mengambil semua riwayat
        const querySnapshot = await getDocs(q);
        const historyData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setHistory(historyData);
      } catch (error) {
        console.error("Error fetching history: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [uid]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Run History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.historyItem}>
            <Text>Run {index + 1}</Text>
            <Text>Distance: {item.distance.toFixed(2)} km</Text>
            <Text>
              Date: {new Date(item.timestamp.seconds * 1000).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  historyItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
});

export default RunHistory;
