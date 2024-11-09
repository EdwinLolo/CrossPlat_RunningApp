import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import { useRoute } from "@react-navigation/native";
import { FIREBASE_DB } from "../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const RunHistoryDetail = () => {
  const route = useRoute();
  const { runId } = route.params; // ID sesi lari yang diteruskan sebagai parameter
  const [runData, setRunData] = useState(null);

  useEffect(() => {
    const fetchRunData = async () => {
      const runDoc = await getDoc(doc(FIREBASE_DB, "runHistory", runId));
      if (runDoc.exists()) {
        setRunData(runDoc.data());
      } else {
        console.error("No such document!");
      }
    };

    fetchRunData();
  }, [runId]);

  if (!runData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: runData.route[0].latitude,
          longitude: runData.route[0].longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Polyline
          coordinates={runData.route}
          strokeColor="blue"
          strokeWidth={3}
        />
      </MapView>
      <View style={styles.infoContainer}>
        <Text>
          Date: {new Date(runData.date.seconds * 1000).toLocaleString()}
        </Text>
        <Text>Distance: {runData.distance.toFixed(2)} km</Text>
        <Text>Duration: {(runData.duration / 60).toFixed(2)} min</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  infoContainer: {
    padding: 16,
  },
});

export default RunHistoryDetail;
