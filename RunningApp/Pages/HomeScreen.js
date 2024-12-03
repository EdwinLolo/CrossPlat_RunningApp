import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { launchImageLibrary } from 'react-native-image-picker';

const HomeScreen = ({ user }) => {
  const navigation = useNavigation();
  const [photoUri, setPhotoUri] = useState(null);

  // Fungsi untuk meng-handle pemilihan gambar dari galeri atau kamera
  const handleImageSelect = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setPhotoUri(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.bluebg}>
        {/* Header dengan gambar atau avatar dan input foto */}
        <View style={styles.header}>
          {/* Foto input pengguna di sebelah kiri teks */}
          <TouchableOpacity onPress={handleImageSelect}>
            <Image
              source={{ uri: photoUri || 'https://koreajoongangdaily.joins.com/data/photo/2023/10/09/b37d6ba6-a639-4674-8594-f8e96bc0587e.jpg' }}  // Gunakan gambar default atau gambar input pengguna
              style={styles.avatar}
            />
          </TouchableOpacity>

          {/* Teks greeting dan level */}
          <View style={styles.textContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.hello}>Hello, </Text>
              <Text style={styles.greetingText}>{user.displayName}</Text>
            </View>
            <Text style={styles.levelText}>Beginner</Text>
          </View>
        </View>

        {/* Tombol navigasi */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ShowCommunity", {
              user: { uid: user.uid, displayName: user.displayName },
            })
          }
          style={styles.buttonRed}
        >
          <Text style={styles.buttonText}>Community</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Tracking", {
              user: { uid: user.uid, displayName: user.displayName },
            })
          }
          style={styles.buttonBlack}
        >
          <Text style={styles.buttonText}>Tracking</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("RunHistory", { uid: user.uid })}
          style={styles.buttonBlue}
        >
          <Text style={styles.buttonText}>RunHistory</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    // paddingTop: 50,
    // paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 150,
    paddingHorizontal: 20,
  },
  bluebg: {
    width: "100%",
    height: "24%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AAC7D8",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginRight: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',  
    alignItems: 'center',  
  },
  hello: {
    fontSize: 18,
    paddingLeft: 5,
    color: "#ffffff",
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#ffffff",
  },
  levelText: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 0,
    paddingHorizontal: 5,
  },
  buttonRed: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonBlack: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonBlue: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default HomeScreen;
