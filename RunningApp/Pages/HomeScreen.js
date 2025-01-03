import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Octicons from "@expo/vector-icons/Octicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { collection, query, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../config/firebaseConfig";

const HomeScreen = ({ user }) => {
  const navigation = useNavigation();
  const [photoUri, setPhotoUri] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const weeklyGoal = 50; // Target mingguan dalam km

  const fetchTotals = async () => {
    try {
      const historyRef = collection(FIREBASE_DB, "users", user.uid, "history");
      const q = query(historyRef);
      const querySnapshot = await getDocs(q);
      const historyData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      let totalDist = 0;
      let totalCal = 0;
      let totalTime = 0;

      historyData.forEach((item) => {
        totalDist += item.distance || 0;
        totalCal += item.calories || 0;
        totalTime += item.time || 0;
      });

      setTotalDistance(totalDist);
      setTotalCalories(totalCal);
      setTotalTime(totalTime);
    } catch (error) {
      console.error("Error fetching totals: ", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTotals();
    }, [user.uid])
  );

  const handleImageSelect = () => {
    launchImageLibrary({ mediaType: "photo", quality: 0.5 }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setPhotoUri(response.assets[0].uri);
      }
    });
  };

  const progressPercentage = (totalDistance / weeklyGoal) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.bluebg}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleImageSelect}>
            <Image
              source={{
                uri:
                  photoUri ||
                  "https://koreajoongangdaily.joins.com/data/photo/2023/10/09/b37d6ba6-a639-4674-8594-f8e96bc0587e.jpg",
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>

          <View style={styles.textContainerHead}>
            <View style={styles.rowContainer}>
              <Text style={styles.hello}>Hello, </Text>
              <Text style={styles.greetingText}>{user.displayName}</Text>
            </View>
            <Text style={styles.levelText}>Beginner</Text>
          </View>
        </View>

        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <View style={styles.HeadText}>
              <Text style={styles.goalText}>Week goal </Text>
              <Text style={[styles.goalText, { color: "#5D63D1" }]}>
                {weeklyGoal} km
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Tracking")}
              style={styles.arrowButtonGoal}
            >
              <Entypo name="chevron-small-right" size={30} color="#333333" />
            </TouchableOpacity>
          </View>

          <View style={styles.goalInfo}>
            <Text style={styles.doneText}>
              {totalDistance.toFixed(2)} km done
            </Text>
            <Text style={styles.leftText}>
              {(weeklyGoal - totalDistance).toFixed(2)} km left
            </Text>
          </View>

          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                { width: `${progressPercentage}%`, backgroundColor: "#5D63D1" },
              ]}
            />
            <View
              style={[
                styles.progressBar,
                {
                  width: `${100 - progressPercentage}%`,
                  backgroundColor: "#d3d3d3",
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.btncontainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ShowCommunity", {
                user: { uid: user.uid, displayName: user.displayName },
              })
            }
            style={styles.button}
          >
            <View style={styles.buttonContent}>
              <Icon
                name="home"
                size={110}
                color="#AAC7D8"
                style={styles.iconCoTra}
              />
              <Text style={styles.buttonTitle}>Join a Community</Text>
              <Text style={styles.buttonSubtitle}>
                Running are more fun when we're together
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Tracking", {
                user: { uid: user.uid, displayName: user.displayName },
              })
            }
            style={styles.buttonTra}
          >
            <View style={styles.buttonContent}>
              <MaterialCommunityIcons
                name="run-fast"
                size={85}
                color="#AAC7D8"
                style={styles.iconTra}
              />
              <Text style={styles.buttonTitle}>Tracking</Text>
              <Text style={styles.buttonSubtitle}>
                let's achive your weekly progress
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.RunHisbtn}>
          <TouchableOpacity
            onPress={() => navigation.navigate("History", { uid: user.uid })}
            style={styles.Runbtn}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Total progress</Text>
              <Entypo name="chevron-small-right" size={30} color="#333333" />
            </View>

            <View style={styles.progressBox}>
              <View style={styles.section}>
                <FontAwesome6 name="person-running" size={30} color="red" />
                <Text> </Text>
                <View style={styles.textContainer}>
                  <Text style={styles.valueText}>
                    {totalDistance.toFixed(2)}
                  </Text>
                  <Text style={styles.unitText}>km</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Octicons name="stopwatch" size={35} color="purple" />
                <Text> </Text>
                <View style={styles.textContainer}>
                  <Text style={styles.valueText}>
                    {(totalTime / 3600).toFixed(2)}
                  </Text>
                  <Text style={styles.unitText}>hr</Text>
                </View>
              </View>

              <View style={styles.sectionLast}>
                <FontAwesome5 name="fire-alt" size={35} color="orange" />
                <Text> </Text>
                <View style={styles.textContainer}>
                  <Text style={styles.valueText}>
                    {totalCalories.toFixed(2)}
                  </Text>
                  <Text style={styles.unitText}>kcal</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: height * 0.15,
    paddingHorizontal: width * 0.05,
  },
  bluebg: {
    width: "100%",
    height: height * 0.24,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AAC7D8",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 10,
  },
  textContainerHead: {
    flex: 1,
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  hello: {
    fontSize: 15,
    paddingLeft: 5,
    color: "#ffffff",
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  levelText: {
    fontSize: 13,
    color: "#ffffff",
    paddingHorizontal: 5,
  },
  btncontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: height * 0.98,
    position: "absolute",
    // paddingLeft: 10,
    top: -20,
  },
  button: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    marginHorizontal: width * 0.01,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: width * 0.45,
    height: width * 0.45,
    borderWidth: 2,
    borderColor: "#AAC7D8",
  },
  buttonTra: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    marginHorizontal: width * 0.01,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: width * 0.4,
    height: width * 0.45,
    borderWidth: 2,
    borderColor: "#AAC7D8",
  },
  buttonContent: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  iconCoTra: {
    marginBottom: 5,
  },
  iconTra: {
    marginBottom: 15,
    marginTop: 17,
  },
  buttonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
  },
  buttonSubtitle: {
    fontSize: 12,
    color: "#000",
    textAlign: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
  RunHisbtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: height * 1.3,
    position: "absolute",
    top: 0,
  },
  Runbtn: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    marginHorizontal: width * 0.05,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: width * 0.87,
    height: width * 0.35,
    borderWidth: 2,
    borderColor: "#AAC7D7",
    marginTop: height * 0.1,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: 5,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },

  arrowText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#AAC7D8",
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
  icon: {
    width: 25,
    height: 25,
    marginBottom: 5,
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
  goalCard: {
    backgroundColor: "#fff",
    padding: width * 0.045,
    borderRadius: 17,
    width: "87%",
    marginTop: height * 0.04,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#DFEBF7",
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goalText: {
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  HeadText: {
    flexDirection: "row",
  },
  arrowButton: {
    padding: width * 0.02,
    borderRadius: 15,
  },
  arrowButtonGoal: {
    padding: width * 0.02,
    borderRadius: 15,
    marginLeft: width * 0.37,
  },
  arrowText: {
    fontSize: width * 0.06,
    color: "#000",
  },
  goalInfo: {
    marginTop: height * 0.003,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  doneText: {
    color: "black",
  },
  leftText: {
    color: "#a0a0a0",
  },
  progressBarContainer: {
    marginTop: height * 0.01,
    marginBottom: height * 0.02,
    height: 10,
    width: "100%",
    borderRadius: 5,
    overflow: "hidden",
    flexDirection: "row",
  },
  progressBar: {
    height: "100%",
  },
});

export default HomeScreen;
