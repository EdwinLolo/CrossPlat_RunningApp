import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Image,
  Alert,
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

const CommunityDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { communityId, communityName, isAdmin } = route.params;

  const [posts, setPosts] = useState([]);

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
      <Text style={styles.title}>Posts in {communityName}</Text>

      {isAdmin && (
        <Button
          title="Add New Post"
          onPress={() =>
            navigation.navigate("AddCommunityDetail", { communityId })
          }
        />
      )}

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Location: {item.location}</Text>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.postImage} />
            )}
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
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  postItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postImage: {
    width: "100%",
    height: 150,
    marginTop: 10,
    borderRadius: 5,
  },
  timestamp: {
    fontSize: 10,
    color: "#666",
    marginTop: 5,
  },
});

export default CommunityDetail;
