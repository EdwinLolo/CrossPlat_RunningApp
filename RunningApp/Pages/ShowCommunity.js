import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FIREBASE_DB } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const ShowCommunity = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { uid, displayName } = route.params?.user || {};

  const [communities, setCommunities] = useState([]); // State untuk menyimpan data komunitas

  useEffect(() => {
    // Fungsi untuk mengambil data komunitas dari Firestore
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
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Community", {
            user: { uid, displayName },
          })
        }
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>Add Community</Text>
      </TouchableOpacity>

      <View style={styles.communityList}>
        <Text style={styles.title}>Community Details</Text>
        {communities.map((community) => (
          <View key={community.id} style={styles.communityItem}>
            {community.logo ? (
              <Image source={{ uri: community.logo }} style={styles.logo} />
            ) : (
              <Text>No Logo Available</Text>
            )}
            <Text style={styles.communityTitle}>
              Community: {community.name}
            </Text>
            <Text>Location: {community.location}</Text>
            <Text>Description: {community.description}</Text>
            <Text>Admin: {community.adminName}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
  },
  communityList: {
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  communityItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  communityTitle: {
    fontWeight: "bold",
  },
  logo: {
    width: 100, // Sesuaikan lebar logo
    height: 100, // Sesuaikan tinggi logo
    borderRadius: 10,
    marginTop: 10,
  },
});

export default ShowCommunity;
