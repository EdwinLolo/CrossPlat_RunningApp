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

        <View style={styles.RunHisbtn}>
          <TouchableOpacity
            onPress={() => navigation.navigate("RunHistory", { uid: user.uid })}
            style={styles.Runbtn}
          >
            {/* Total Progress Box */}
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Total progress</Text>
            </View>

            {/* Box with 3 sections */}
            <View style={styles.progressBox}>
              {/* First Section: Running */}
              <View style={styles.section}>
                {/* <Image
                  source={require('./assets/run-icon.png')} // Gambar orang lari
                  style={styles.icon}
                /> */}
                <View style={styles.textContainer}>
                  <Text style={styles.valueText}>103,2</Text>
                  <Text style={styles.unitText}>km</Text>
                </View>
              </View>

              {/* Second Section: Stopwatch */}
              <View style={styles.section}>
                {/* <Image
                  source={require('./assets/stopwatch-icon.png')} // Gambar stopwatch
                  style={styles.icon}
                /> */}
                <View style={styles.textContainer}>
                  <Text style={styles.valueText}>16,9</Text>
                  <Text style={styles.unitText}>hr</Text>
                </View>
              </View>

              {/* Third Section: Calories */}
              <View style={styles.sectionLast}>
                {/* <Image
                  source={require('./assets/fire-icon.png')} // Gambar api
                  style={styles.icon}
                /> */}
                <View style={styles.textContainer}>
                  <Text style={styles.valueText}>1,5</Text>
                  <Text style={styles.unitText}>kcal</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
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
    paddingTop: height * 0.07,
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
  RunHisbtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: height * 0.37,
    position: 'absolute',
    top: 0,
  },
  Runbtn: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    marginHorizontal: width * 0.05,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: width * 0.87,
    height: width * 0.4,
    borderWidth: 2,
    borderColor: '#AAC7D7',
    marginTop: height * 0.14,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 5,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  progressBox: {
    flexDirection: 'row',
    width: width * 0.83,
    height: height * 0.09,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#AAC7D7',
    borderRadius: 6,
    marginTop: 5,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#AAC7D8',
  },
  sectionLast: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  icon: {
    width: 25,
    height: 25,
    marginBottom: 5,
  },
  textContainer: {
    alignItems: 'flex-end',
  },
  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  unitText: {
    fontSize: 11,
    color: '#888888',
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
