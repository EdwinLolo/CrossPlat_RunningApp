import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { FIREBASE_DB } from "../config/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { useRoute } from "@react-navigation/native";
import { Title } from "react-native-paper";

const Community = () => {
  const route = useRoute();
  const { uid, displayName } = route.params?.user || {}; // Ambil uid dan displayName

  const [communityName, setCommunityName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null); // URL untuk logo gambar

  // Fungsi untuk memilih gambar logo
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // Cek apakah result tidak dibatalkan dan memiliki aset
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setLogo(result.assets[0].uri); // Ambil URI gambar dari result.assets
      console.log(result.assets[0].uri);
    }
  };

  const createCommunity = async () => {
    if (
      !communityName.trim() ||
      !location.trim() ||
      !description.trim() ||
      !logo
    ) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    if (!uid || !displayName) {
      Alert.alert("Error", "User information is missing");
      return;
    }

    try {
      // Menyimpan komunitas baru ke Firestore
      await addDoc(collection(FIREBASE_DB, "communitiesCrossPlat"), {
        Title: communityName,
        location: location,
        description: description,
        logo: logo, // URL logo gambar
        adminId: uid,
        adminName: displayName,
        createdAt: new Date(),
      });

      Alert.alert("Success", "Community created successfully!");
      // Reset semua input setelah komunitas dibuat
      setCommunityName("");
      setLocation("");
      setDescription("");
      setLogo(null);
    } catch (error) {
      console.error("Error creating community:", error);
      Alert.alert("Error", "Failed to create community");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Community</Text>
      <TextInput
        style={styles.input}
        placeholder="Community Name"
        value={communityName}
        onChangeText={setCommunityName}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {logo ? (
          <Image source={{ uri: logo }} style={styles.logo} />
        ) : (
          <Text style={styles.imageText}>Pick a Logo</Text>
        )}
      </TouchableOpacity>
      <Button title="Create Community" onPress={createCommunity} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
  },
  imagePicker: {
    height: 150,
    width: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 75,
    overflow: "hidden",
  },
  logo: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
  imageText: {
    color: "#666",
  },
});

export default Community;
