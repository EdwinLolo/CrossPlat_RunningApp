import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import * as Location from "expo-location";
import MapView, { Polyline, Marker } from "react-native-maps";
import haversine from "haversine";

const Tracking = ({ setHistory, history, navigation }) => {
  const [location, setLocation] = useState(null);
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(0);
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    let locationSubscription;

    if (tracking) {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("Izin akses lokasi diperlukan untuk tracking");
          return;
        }

        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (newLocation) => {
            const { latitude, longitude } = newLocation.coords;
            setLocation({ latitude, longitude });
            setRoute((prevRoute) => {
              const newRoute = [...prevRoute, { latitude, longitude }];

              if (newRoute.length > 1) {
                const prevLoc = newRoute[newRoute.length - 2];
                const newDistance = haversine(prevLoc, { latitude, longitude });
                setDistance((prevDistance) => prevDistance + newDistance);
              }

              return newRoute;
            });
          }
        );
      })();
    }

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [tracking]);

  const startTracking = () => {
    setRoute([]);
    setDistance(0);
    setTracking(true);
  };

  const stopTracking = () => {
    if (route.length > 0) {
      setTracking(false);
      if (typeof setHistory === "function") {
        setHistory((prevHistory) => [...(prevHistory || []), { route, distance }]);
      } else {
        console.warn("setHistory is not a function.");
      }
    } else {
      alert("Belum ada data untuk disimpan. Mulai tracking terlebih dahulu.");
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location ? location.latitude : 37.78825, // Nilai default yang lebih aman
          longitude: location ? location.longitude : -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
      >
        <Polyline coordinates={route} strokeColor="blue" strokeWidth={3} />
        {route.length > 0 && (
          <Marker coordinate={route[route.length - 1]} title="Posisi Terkini" />
        )}
      </MapView>
      <View style={styles.infoContainer}>
        <Text>Total Jarak: {distance.toFixed(2)} km</Text>
        <Button title="Start" onPress={startTracking} disabled={tracking} />
        <Button title="Stop" onPress={stopTracking} disabled={!tracking} />
        <Button title="View Run History" onPress={() => navigation.navigate("RunHistory")} />
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
    bottom: 100,
    left: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default Tracking;
