import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import MapView, { Polyline, Marker } from "react-native-maps";
import { collection, query, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../config/firebaseConfig";
import { launchImageLibrary } from 'react-native-image-picker';

const RunHistory = ({ route, navigation, user }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { uid } = route.params;
  const [photoUri, setPhotoUri] = useState(null);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Mengambil riwayat perjalanan dari Firestore
        const historyRef = collection(FIREBASE_DB, "users", uid, "history");
        const q = query(historyRef); 
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

  const handleImageSelect = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setPhotoUri(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.bluebg}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleImageSelect}>
            <Image
              source={{ uri: photoUri || 'https://koreajoongangdaily.joins.com/data/photo/2023/10/09/b37d6ba6-a639-4674-8594-f8e96bc0587e.jpg' }}  // Gunakan gambar default atau gambar input pengguna
              style={styles.avatar}
            />
          </TouchableOpacity>

          <View style={styles.textContainerHead}>
            <View style={styles.rowContainer}>
              <Text style={styles.hello}>Hello, </Text>
              {/* <Text style={styles.greetingText}>{user.displayName}</Text> */}
            </View>
            <Text style={styles.levelText}>Beginner</Text>
          </View>
        </View>

        

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
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
  },
  bluebg: {
    width: '100%',
    height: height * 0.24,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AAC7D8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: height * 0.15,
    paddingHorizontal: width * 0.05,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 10,
  },
  textContainerHead: {
    flex: 1,
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hello: {
    fontSize: 15,
    paddingLeft: 5,
    color: '#ffffff',
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  levelText: {
    fontSize: 13,
    color: '#ffffff',
    paddingHorizontal: 5,
  },
  // title: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   marginBottom: 20,
  // },
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
