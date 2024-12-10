import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import MapView, { Polyline, Marker } from "react-native-maps";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";

const RunHistoryDetail = ({ route }) => {
  const { historyItem } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: historyItem.route?.[0]?.latitude || 37.78825,
          longitude: historyItem.route?.[0]?.longitude || -122.4324,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Polyline
          coordinates={historyItem.route}
          strokeColor="blue"
          strokeWidth={3}
        />
        {historyItem.route?.[0] && (
          <Marker coordinate={historyItem.route[0]} title="Start Point" />
        )}
        {historyItem.route?.[historyItem.route.length - 1] && (
          <Marker
            coordinate={historyItem.route[historyItem.route.length - 1]}
            title="End Point"
          />
        )}
      </MapView>
      {/* <View style={styles.RunHisbtn}> */}
      <View style={styles.Runbtn}>
        {/* Title and Arrow */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Total progress</Text>
          {/* <Entypo name="chevron-small-right" size={30} color="#333333" /> */}
          <View>
            <Text style={styles.detailText}>
              {new Date(
                historyItem.timestamp.seconds * 1000
              ).toLocaleDateString("en-US")}
            </Text>
            <Text style={styles.detailText}>Steps: {historyItem.steps}</Text>
            <Text style={styles.detailText}>Pace: {historyItem.pace}</Text>
          </View>
        </View>

        {/* Box with 3 sections */}
        <View style={styles.progressBox}>
          {/* First Section: Running */}
          <View style={styles.section}>
            <FontAwesome6 name="person-running" size={30} color="red" />
            <Text> </Text>
            <View style={styles.textContainer}>
              <Text style={styles.valueText}>
                {(historyItem.distance || 0).toFixed(2)}
              </Text>
              <Text style={styles.unitText}>km</Text>
            </View>
          </View>

          {/* Second Section: Stopwatch */}
          <View style={styles.section}>
            <Octicons name="stopwatch" size={35} color="purple" />
            <Text> </Text>
            <View style={styles.textContainer}>
              <Text style={styles.valueText}>{historyItem.time}</Text>
              <Text style={styles.unitText}>seconds</Text>
            </View>
          </View>

          {/* Third Section: Calories */}
          <View style={styles.sectionLast}>
            <FontAwesome5 name="fire-alt" size={35} color="orange" />
            <Text> </Text>
            <View style={styles.textContainer}>
              <Text style={styles.valueText}>
                {(historyItem.calories || 0).toFixed(2)}
              </Text>
              <Text style={styles.unitText}>kcal</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
    // </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  Runbtn: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: width * 0.87,
    height: width * 0.45,
    borderWidth: 2,
    borderColor: "#AAC7D7",
    position: "absolute",
    bottom: 60,
    left: 30,
    right: 30,
  },
  titleContainer: {
    flexDirection: "column",
    // justifyContent: "space-between",
    // alignItems: "center",
    width: "100%",
    paddingBottom: 5,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  progressBox: {
    flexDirection: "row",
    width: width * 0.83,
    height: height * 0.09,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#AAC7D7",
    borderRadius: 6,
    marginTop: 5,
    marginBottom: 5,
  },
  section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: "#AAC7D8",
    flexDirection: "row",
  },
  sectionLast: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  textContainer: {
    alignItems: "flex-end",
  },
  valueText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  unitText: {
    fontSize: 11,
    color: "#888888",
  },
});

export default RunHistoryDetail;
