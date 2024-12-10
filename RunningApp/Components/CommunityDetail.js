import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FIREBASE_DB } from "../config/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

import styles from "../Pages/PagesStyle/CommunityDetail.style";

const CommunityDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { communityId, communityName, isAdmin, communityLogo } = route.params;

  const [posts, setPosts] = useState([]);

  // console.log(communityLogo);
  // Fungsi untuk mengambil postingan dari Firestore
  const fetchPosts = async () => {
    try {
      const postsRef = collection(FIREBASE_DB, "posts");
      const q = query(postsRef, where("communityId", "==", communityId));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [communityId]);

  // Fungsi untuk menghapus postingan
  const handleDeletePost = async (postId) => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(FIREBASE_DB, "posts", postId));
            fetchPosts(); // Memperbarui daftar postingan setelah penghapusan
          } catch (error) {
            console.error("Error deleting post:", error);
          }
        },
      },
    ]);
  };

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

          {isAdmin && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AddCommunityDetail", { communityId })
              }
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          )}
        </View>

        <View>
          <View style={styles.userProfileContainer}>
            <Image
              style={styles.userImage}
              source={
                communityLogo
                  ? { uri: communityLogo }
                  : require("../assets/profile.png")
              }
              onError={(e) =>
                console.log("Error loading image:", e.nativeEvent.error)
              }
            />
            <Text style={styles.emailText}>{communityName}</Text>
          </View>
        </View>
      </View>

      {/* <Text style={styles.title}>Posts in {communityName}</Text> */}

      <View style={styles.postContainer}>
        <FlatList
          style={styles.postItemContainer}
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postItem}>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.postImage} />
              )}
              <View style={styles.postTextContainer}>
                <Text style={styles.postTitle}>Title: {item.title}</Text>
                <Text>Desc: {item.description}</Text>
                <Text>Location: {item.location}</Text>
                <Text style={styles.timestamp}>
                  {item.createdAt.toDate().toString()}
                </Text>
                {isAdmin && (
                  <Button
                    title="Delete Post"
                    color="red"
                    onPress={() => handleDeletePost(item.id)}
                  />
                )}
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default CommunityDetail;
