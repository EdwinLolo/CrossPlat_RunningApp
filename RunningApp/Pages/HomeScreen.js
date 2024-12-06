import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { launchImageLibrary } from 'react-native-image-picker';

const HomeScreen = ({ user }) => {
  const navigation = useNavigation();
  const [photoUri, setPhotoUri] = useState(null);

  const goalDistance = 50; // Total goal distance in km
  const distanceDone = 35; // Distance done in km
  const distanceLeft = goalDistance - distanceDone;
  const progress = (distanceDone / goalDistance) * 100; // Percentage done

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
          <TouchableOpacity onPress={handleImageSelect}>
            <Image
              source={{ uri: photoUri || 'https://koreajoongangdaily.joins.com/data/photo/2023/10/09/b37d6ba6-a639-4674-8594-f8e96bc0587e.jpg' }}  // Gunakan gambar default atau gambar input pengguna
              style={styles.avatar}
            />
          </TouchableOpacity>

          <View style={styles.textContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.hello}>Hello, </Text>
              <Text style={styles.greetingText}>{user.displayName}</Text>
            </View>
            <Text style={styles.levelText}>Beginner</Text>
          </View>
        </View>

        {/* Week Goal Card */}
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <View style={styles.HeadText}>
              <Text style={styles.goalText}>Week goal  </Text>
              <Text style={[styles.goalText, { color: 'purple' }]}>50 km</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Tracking")} style={styles.arrowButton}>
              <Text style={styles.arrowText}>></Text>
            </TouchableOpacity>
          </View>

          <View style={styles.goalInfo}>
            <Text style={styles.doneText}>35 km done</Text>
            <Text style={styles.leftText}>15 km left</Text>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress}%`, backgroundColor: 'purple' }]} />
            <View style={[styles.progressBar, { width: `${100 - progress}%`, backgroundColor: '#d3d3d3' }]} />
          </View>
        </View>

        {/* Buttons */}
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
    width: 50,
    height: 50,
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
    fontSize: 15,
    paddingLeft: 5,
    color: '#ffffff',
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  levelText: {
    fontSize: 13,
    color: '#ffffff',
    paddingHorizontal: 5,
  },
  btncontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: height * 0.9,
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
  goalCard: {
    backgroundColor: '#fff',
    padding: width * 0.045,
    borderRadius: 17,
    width: '87%',
    marginBottom: height * 0.00,
    marginTop: height * 0.04,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    alignSelf: 'center',
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  HeadText: {
    flexDirection: 'row',
  },
  arrowButton: {
    padding: width * 0.02,
    borderRadius: 15,
  },
  arrowText: {
    fontSize: width * 0.06,
    color: '#000',
  },
  goalInfo: {
    marginTop: height * 0.003,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  doneText: {
    color: 'black',
  },
  leftText: {
    color: '#a0a0a0',
  },
  progressBarContainer: {
    marginTop: height * 0.01,
    marginBottom: height * 0.02,
    height: 10,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  progressBar: {
    height: '100%',
  },
});

export default HomeScreen;
