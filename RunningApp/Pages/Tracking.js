import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import * as Location from "expo-location";
import MapView, { Polyline, Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import { doc, collection, addDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../config/firebaseConfig";
import { Pedometer } from "expo-sensors";

// Fungsi untuk menghitung jarak menggunakan rumus Haversine
const haversine = (coords1, coords2) => {
  const R = 6371; // Radius bumi dalam kilometer
  const dLat = (coords2.latitude - coords1.latitude) * (Math.PI / 180);
  const dLon = (coords2.longitude - coords1.longitude) * (Math.PI / 180);
  const lat1 = coords1.latitude * (Math.PI / 180);
  const lat2 = coords2.latitude * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Dalam kilometer
};

// Fungsi untuk menyimpan riwayat perjalanan ke Firestore
const saveHistory = async (route, distance, time, calories, steps, uid) => {
  try {
    const historyRef = collection(FIREBASE_DB, "users", uid, "history");
    await addDoc(historyRef, {
      route, // Menyimpan array route
      distance,
      time,
      calories,
      steps,
      timestamp: new Date(),
    });
    console.log("History saved successfully");
  } catch (error) {
    console.error("Error saving history: ", error);
  }
};

const Tracking = () => {
  const [location, setLocation] = useState(null);
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(0);
  const [tracking, setTracking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0); // dalam detik
  const [calories, setCalories] = useState(0);
  const [steps, setSteps] = useState(0);
  const navigation = useNavigation();
  const routeParams = useRoute().params;
  const { uid, displayName } = routeParams?.user || {}; // Mengambil uid dan displayName dari params

  useEffect(() => {
    let locationSubscription;

    if (tracking) {
      setStartTime(new Date()); // Mencatat waktu mulai pelacakan
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

  useEffect(() => {
    if (tracking && startTime) {
      const interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1); // Menghitung waktu dalam detik
      }, 1000); // Mengupdate setiap detik

      return () => clearInterval(interval);
    }
  }, [tracking, startTime]);

  useEffect(() => {
    if (tracking) {
      const totalCalories = calculateCalories();
      setCalories(totalCalories); // Set kalori setiap detik
    }
  }, [elapsedTime, tracking]); // Mengupdate kalori setiap kali elapsedTime berubah

  useEffect(() => {
    let pedometerSubscription;

    if (tracking) {
      Pedometer.isAvailableAsync().then(
        (result) => {
          if (result) {
            pedometerSubscription = Pedometer.watchStepCount((result) => {
              setSteps(result.steps);
            });
          } else {
            alert("Pedometer tidak tersedia pada perangkat ini.");
          }
        },
        (error) => {
          console.error("Error checking pedometer availability: ", error);
        }
      );
    }

    return () => {
      if (pedometerSubscription) {
        pedometerSubscription.remove();
      }
    };
  }, [tracking]);

  // Menghitung pace (menit per km)
  const calculatePace = () => {
    if (elapsedTime === 0 || distance === 0) return 0;
    const paceInMinutes = elapsedTime / 60 / distance; // waktu dalam menit per kilometer
    return paceInMinutes;
  };

  // Fungsi untuk menghitung kalori yang terbakar (menggunakan rumus sederhana)
  const calculateCalories = () => {
    if (elapsedTime === 0) return 0; // Pastikan waktu sudah cukup sebelum menghitung kalori
    const MET = 8; // MET untuk berlari dengan kecepatan moderat
    const hours = elapsedTime / 3600; // waktu dalam jam
    return MET * 55 * hours; // Kalori yang terbakar
  };

  const startTracking = () => {
    setRoute([]); // Reset rute ketika mulai pelacakan baru
    setDistance(0); // Reset jarak
    setElapsedTime(0); // Reset waktu
    setCalories(0); // Reset kalori
    setSteps(0); // Reset langkah
    setTracking(true); // Mulai pelacakan
  };

  const stopTracking = () => {
    if (route.length > 0) {
      setTracking(false);
      const pace = calculatePace();
      const totalCalories = calculateCalories();
      saveHistory(route, distance, elapsedTime, totalCalories, steps, uid); // Menyimpan riwayat ke Firestore
    } else {
      alert("Belum ada data untuk disimpan. Mulai tracking terlebih dahulu.");
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location ? location.latitude : -6.2666,
          longitude: location ? location.longitude : 106.605,
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
        <Text>Pace: {calculatePace().toFixed(2)} menit/km</Text>
        <Text>
          Waktu: {Math.floor(elapsedTime / 60)} menit {elapsedTime % 60} detik
        </Text>
        <Text>Kalori Terbakar: {calories.toFixed(2)} kcal</Text>
        <Text>Langkah: {steps}</Text>
        <Button title="Start" onPress={startTracking} disabled={tracking} />
        <Button title="Stop" onPress={stopTracking} disabled={!tracking} />
        <Button
          title="View Run History"
          onPress={() => navigation.navigate("RunHistory", { uid: uid })}
        />
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
