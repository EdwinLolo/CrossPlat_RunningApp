import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import * as Location from "expo-location";
import MapView, { Polyline } from "react-native-maps";
import { FIREBASE_DB } from "../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import haversine from "haversine-distance"; // Menghitung jarak antara dua titik GPS

const Tracking = () => {
  const [location, setLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [tracking, setTracking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [distance, setDistance] = useState(0); // Jarak total

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const startTracking = async () => {
    setTracking(true);
    setStartTime(new Date());
    setRouteCoordinates([]);
    setDistance(0);

    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 2000,
        distanceInterval: 1,
      },
      (newLocation) => {
        const { latitude, longitude } = newLocation.coords;
        const newCoordinate = { latitude, longitude };

        if (routeCoordinates.length > 0) {
          const lastCoordinate = routeCoordinates[routeCoordinates.length - 1];
          const dist = haversine(lastCoordinate, newCoordinate) / 1000; // Jarak dalam km
          setDistance((prevDistance) => prevDistance + dist);
        }

        setLocation(newCoordinate);
        setRouteCoordinates((prevCoords) => [...prevCoords, newCoordinate]);
      }
    );
  };

  const stopTracking = async () => {
    setTracking(false);
    const endTime = new Date();
    const duration = (endTime - startTime) / 1000; // Durasi dalam detik

    // Simpan riwayat lari ke Firestore
    await addDoc(collection(FIREBASE_DB, "runHistory"), {
      date: startTime,
      duration: duration, // Durasi dalam detik
      distance: distance, // Jarak dalam km
      route: routeCoordinates, // Rute yang dilalui
    });

    // Reset data tracking
    setStartTime(null);
    setRouteCoordinates([]);
    setDistance(0);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location ? location.latitude : 37.78825,
          longitude: location ? location.longitude : -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
      >
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="blue"
          strokeWidth={3}
        />
      </MapView>

      <View style={styles.infoContainer}>
        <Text>Distance: {distance.toFixed(2)} km</Text>
        <Text>
          Time:{" "}
          {tracking && startTime
            ? `${((new Date() - startTime) / 1000).toFixed(0)} s`
            : "0 s"}
        </Text>
        {tracking ? (
          <Button title="Stop Tracking" onPress={stopTracking} />
        ) : (
          <Button title="Start Tracking" onPress={startTracking} />
        )}
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
    position: "absolute",
    bottom: 50,
    left: 20,
  },
});

export default Tracking;
