import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { FIREBASE_DB, FIREBASE_STORAGE } from "../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigation, useRoute } from "@react-navigation/native";

const AddCommunityDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { communityId } = route.params;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pick an image from the gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  // Upload image to Firebase Storage and return the download URL
  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = uri.split("/").pop(); // Get file name from URI

    const storageRef = ref(FIREBASE_STORAGE, `postImages/${filename}`);
    await uploadBytes(storageRef, blob);

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  // Handle adding a new post to Firestore
  const handleAddPost = async () => {
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      location.trim() === "" ||
      !image
    ) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      // Upload image and get the URL
      const imageUrl = await uploadImage(image);

      // Add post to Firestore
      await addDoc(collection(FIREBASE_DB, "posts"), {
        communityId: communityId,
        title: title,
        description: description,
        location: location,
        image: imageUrl, // Save the image URL from Firebase Storage
        createdAt: new Date(),
      });

      navigation.goBack(); // Go back to the previous screen after posting
    } catch (error) {
      console.error("Error adding post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {image ? (
          <Image source={{ uri: image }} style={styles.previewImage} />
        ) : (
          <Text style={styles.imageText}>Pick an Image</Text>
        )}
      </TouchableOpacity>
      <Button
        title={loading ? "Adding Post..." : "Add Post"}
        onPress={handleAddPost}
        disabled={loading}
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  imagePicker: {
    height: 100,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  imageText: {
    color: "#666",
  },
});

export default AddCommunityDetail;
