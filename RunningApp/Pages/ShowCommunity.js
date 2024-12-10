import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FIREBASE_DB } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import styles from "./PagesStyle/ShowCommunity.style";

const ShowCommunity = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { uid, displayName, email, level } = route.params?.user || {};

  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(FIREBASE_DB, "communitiesCrossPlat")
        );
        const communitiesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCommunities(communitiesData);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    fetchCommunities();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerButton}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.title}>Community</Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Community", {
                user: { uid, displayName },
              })
            }
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        {uid ? (
          <View>
            <View style={styles.userProfileContainer}>
              <Image
                style={styles.userImage}
                source={require("../assets/profile.png")}
              />
            </View>
            <Text style={styles.emailText}>{email}</Text>
            <Text style={styles.emailText}>{displayName}</Text>
          </View>
        ) : (
          <Text style={styles.emailText}>User not available</Text>
        )}
      </View>
      <View style={styles.CommunityListContainer}>
        <ScrollView style={styles.communityList}>
          {communities.map((community) => (
            <TouchableOpacity
              key={community.id}
              style={styles.communityItem}
              onPress={() =>
                navigation.navigate("CommunityDetail", {
                  communityId: community.id,
                  communityName: community.Title,
                  isAdmin: community.adminId === uid,
                  communityLogo: community.logo, // Tambahkan ini
                })
              }
            >
              <View style={styles.communityItemContent}>
                {community.logo && (
                  <Image source={{ uri: community.logo }} style={styles.logo} />
                )}
                <View style={styles.communityTextContainer}>
                  <Text style={styles.communityTitle}>
                    Community: {community.Title}
                  </Text>
                  <Text>Location: {community.location}</Text>
                  <Text>Description: {community.description}</Text>
                  <Text>Admin: {community.adminName}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="gray" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ShowCommunity;
