import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import styles from "./PagesStyle/Profile.style.js";
import ProfileOptions from "../Components/ProfileOptions.js";
import ProgressCard from "../Components/ProgressCard.js";
import { collection, query, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../config/firebaseConfig";

const Profile = ({ user = {}, handleAuthentication = () => {} }) => {
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotals();
  }, [user.uid]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.ProfileContainer}>
      <View style={styles.UserContainer}>
        <Text style={styles.title}>Profile</Text>
        {user ? (
          <View style={styles.userProfileContainer}>
            <View>
              <Image
                style={styles.userImage}
                source={require("../assets/profile.png")}
              />
            </View>
            <Text style={styles.emailText}>{user.email}</Text>
            <Text style={styles.emailText}>{user.displayName}</Text>
          </View>
        ) : (
          <Text style={styles.emailText}>User not available</Text>
        )}
      </View>
      <ProgressCard
        totalDistance={totalDistance}
        totalCalories={totalCalories}
        totalTime={totalTime}
      />
      <ProfileOptions />
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleAuthentication}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
