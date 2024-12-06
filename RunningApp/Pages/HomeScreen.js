import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
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
        <View style={styles.btncontainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ShowCommunity", {
                user: { uid: user.uid, displayName: user.displayName },
              })
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>Community</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Tracking", {
                user: { uid: user.uid, displayName: user.displayName },
              })
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>Tracking</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.RunHisbtn}>
          <TouchableOpacity
            onPress={() => navigation.navigate("RunHistory", { uid: user.uid })}
            style={styles.button}
          >
            <Text style={styles.buttonText}>RunHistory</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: height * 0.15, 
    paddingHorizontal: width * 0.05, 
  },
  bluebg: {
    width: '100%',
    height: height * 0.24, 
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AAC7D8',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30, 
    marginRight: 10, 
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
    color: '#ffffff',
  },
  greetingText: {
    fontSize: 22, 
    fontWeight: 'bold',
    color: '#ffffff',
  },
  levelText: {
    fontSize: 16,
    color: '#ffffff',
    paddingHorizontal: 5,
  },
  btncontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: height, 
    position: 'absolute', 
    top: 0, 
  },
  RunHisbtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: height * 1.3,
    position: 'absolute',
    top: 0, 
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    marginHorizontal: width * 0.05, 
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    width: width * 0.2,
    height: width * 0.2, 
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default HomeScreen;
