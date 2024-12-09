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
import React, { useEffect, useState } from "react";
import MapView, { Polyline, Marker } from "react-native-maps";
import { collection, query, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../config/firebaseConfig";
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from "@react-navigation/native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';


const RunHistory = ({ route }) => {
  const navigation = useNavigation();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photoUri, setPhotoUri] = useState(null);
  const { uid } = route.params;
  const { user } = route.params;

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

  const handleDetailNavigation = (item) => {
    navigation.navigate('RunHistoryDetail', { historyItem: item });
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
      </View>
      <View style={styles.RunHisbtn}>
        <View style={styles.Runbtn}>
          {/* Total Progress Box */}
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Total progress</Text>
          </View>

          {/* Box with 3 sections */}
          <View style={styles.progressBox}>
            {/* First Section: Running */}
            <View style={styles.section}>
              <FontAwesome6 name="person-running" size={30} color="red" />
              <Text>   </Text>
              <View style={styles.textContainer}>
                <Text style={styles.valueText}>103,2</Text>
                <Text style={styles.unitText}>km</Text>
              </View>
            </View>

            {/* Second Section: Stopwatch */}
            <View style={styles.section}>
              <Octicons name="stopwatch" size={35} color="purple" />
              <Text>   </Text>
              <View style={styles.textContainer}>
                <Text style={styles.valueText}>16,9</Text>
                <Text style={styles.unitText}>hr</Text>
              </View>
            </View>

            {/* Third Section: Calories */}
            <View style={styles.sectionLast}>
              <FontAwesome5 name="fire-alt" size={35} color="orange" /><Text>   </Text>
              <View style={styles.textContainer}>
                <Text style={styles.valueText}>1,5</Text>
                <Text style={styles.unitText}>kcal</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.HisList}>
        <FlatList
          style={styles.wrapper}
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.historyItem}>
              {/* Map and Text in a row */}
              <View style={styles.mapContainer}>
                {/* Left side: Map */}
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: item.route?.[0]?.latitude || 37.78825,
                    longitude: item.route?.[0]?.longitude || -122.4324,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                  }}
                >
                  <Polyline
                    coordinates={item.route}
                    strokeColor="#FFB5O9"
                    strokeWidth={3}
                  />
                  {item.route?.[0] && (
                    <Marker coordinate={item.route[0]} title="Start Point" />
                  )}
                  {item.route?.[item.route.length - 1] && (
                    <Marker
                      coordinate={item.route[item.route.length - 1]}
                      title="End Point"
                    />
                  )}
                </MapView>

                {/* Right side: Text information */}
                <View style={styles.textContainerRight}>
                  <Text style={styles.historyText}>
                    {new Date(item.timestamp?.seconds * 1000).toLocaleDateString('en-US', {
                      month: 'long', 
                      day: 'numeric', 
                    })}
                  </Text>
                  <Text style={styles.historyTextDis}>{(item.distance || 0).toFixed(2)} km</Text>
                  <View style={styles.calnspeed}>
                    <Text style={styles.historyText}>
                      {(item.calories || 0).toFixed(2)} kcal   {item.time && item.time > 0 ? ((item.distance || 0) / (item.time || 1) * 3600).toFixed(2) : 0} km/h
                    </Text>
                  </View>
                  {/* Tanda > untuk menuju ke detail */}
                  <TouchableOpacity onPress={() => handleDetailNavigation(item)} style={styles.arrowContainer}>
                    <Entypo name="chevron-small-right" size={30} color="gray" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingBottom: height * 0.07,
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
    marginTop: height * 0.15,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: height * 0.015,
  },
  titleText: {
    fontSize: 21.5,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: width * 0.004,
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
    flexDirection: 'row',
  },
  sectionLast: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
  HisList: {
    flex: 1,
    padding: 10,
    paddingTop: height * 0.14,
    width: '100%',
    alignItems: 'center',
  },
  wrapper: {
    borderWidth: 3,
    borderColor: '#AAC7D7',
    padding: 10,
    marginVertical: 3,
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
    width: width * 0.87,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    backgroundColor: 'white',
    marginBottom: height * 0.15
  },
  historyTextDis: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    marginLeft: width * 0.04,
  },
  historyText: {
    fontSize: 14,
    marginBottom: 5,
    color: 'gray',
    marginLeft: width * 0.04,
  },
  mapContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  map: {
    height: height * 0.09,
    width: height * 0.09,
    borderRadius: 20,
    marginTop: height * 0.0001,
    left: width * 0.02,
  },
  textContainerRight: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  calnspeed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowContainer: {
    position: 'absolute',
    right: width * 0.05,
    top: height * 0.037,
    transform: [{ translateY: -10 }],
  },
  arrowText: {
    fontSize: 24,
    color: 'gray',
  },
  separator: {
    left: width * 0.1,
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 5,
    width: '70%',
    alignItems: 'center'
  },
});

export default RunHistory;
