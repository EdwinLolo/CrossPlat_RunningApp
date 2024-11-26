import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Polyline, Marker } from "react-native-maps";
import { collection, query, getDocs } from "firebase/firestore";
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
            <Text>Distance: {(item.distance || 0).toFixed(2)} km</Text>
            <Text>Calories: {(item.calories || 0).toFixed(2)} kcal</Text>
            <Text>
              Time: {Math.floor((item.time || 0) / 60)} min{" "}
              {(item.time || 0) % 60} sec
            </Text>
            <Text>
              Date: {new Date(item.timestamp?.seconds * 1000).toLocaleString()}
            </Text>
            {/* Menampilkan peta dengan polyline */}
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: item.route?.[0]?.latitude || 37.78825,
                longitude: item.route?.[0]?.longitude || -122.4324,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              {/* Menggambar Polyline untuk seluruh route */}
              <Polyline
                coordinates={item.route}
                strokeColor="blue"
                strokeWidth={3}
              />

              {/* Menampilkan Marker hanya di titik awal */}
              {item.route?.[0] && (
                <Marker coordinate={item.route[0]} title="Start Point" />
              )}

              {/* Menampilkan Marker hanya di titik akhir */}
              {item.route?.[item.route.length - 1] && (
                <Marker
                  coordinate={item.route[item.route.length - 1]}
                  title="End Point"
                />
              )}
            </MapView>
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
  map: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
});

export default RunHistory;
