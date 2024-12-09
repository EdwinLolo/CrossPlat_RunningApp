import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ user }) => {
  const navigation = useNavigation();
  const [photoUri, setPhotoUri] = useState(null);

  const goalDistance = 50;
  const distanceDone = 35;
  const distanceLeft = goalDistance - distanceDone;
  const progress = (distanceDone / goalDistance) * 100;

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

          <View style={styles.textContainerHead}>
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
              <Text style={[styles.goalText, { color: '#5D63D1' }]}>50 km</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Tracking")} style={styles.arrowButton}>
              <Text style={styles.arrowText}></Text>
            </TouchableOpacity>
          </View>

          <View style={styles.goalInfo}>
            <Text style={styles.doneText}>35 km done</Text>
            <Text style={styles.leftText}>15 km left</Text>
          </View>

          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress}%`, backgroundColor: '#5D63D1' }]} />
            <View style={[styles.progressBar, { width: `${100 - progress}%`, backgroundColor: '#d3d3d3' }]} />
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.btncontainer}>
          {/* Community Button */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ShowCommunity", {
                user: { uid: user.uid, displayName: user.displayName },
              })
            }
            style={styles.button}
          >
            <View style={styles.buttonContent}>
              <Icon name="home" size={110} color="#AAC7D8" style={styles.iconCoTra} />
              <Text style={styles.buttonTitle}>Join a Community</Text>
              <Text style={styles.buttonSubtitle}>Running are more fun when we're together</Text>
            </View>
          </TouchableOpacity>

          {/* Tracking Button */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Tracking", {
                user: { uid: user.uid, displayName: user.displayName },
              })
            }
            style={styles.buttonTra}
          >
            <View style={styles.buttonContent}>
              {/* <Icon name="home" size={110} color="#AAC7D8" style={styles.iconCoTra} /> */}
              <Image
                source={require('../assets/svg/run-stickman.svg')} // Gambar orang lari
                style={styles.icon}
              />
              <Text style={styles.buttonTitle}>Tracking</Text>
              <Text style={styles.buttonSubtitle}>let's increase productivity and achive your weekly progress</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* RunHistory Button */}
        <View style={styles.RunHisbtn}>
          <TouchableOpacity
            onPress={() => navigation.navigate("RunHistory", { uid: user.uid })}
            style={styles.Runbtn}
          >
            {/* Title and Arrow */}
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Total progress</Text>
              <Text style={styles.arrowText}> &gt;</Text>
            </View>

            {/* Box with 3 sections */}
            <View style={styles.progressBox}>
              {/* First Section: Running */}
              <View style={styles.section}>
                {/* <Image
                  source={require('./assets/run-icon.png')} // Gambar orang lari
                  style={styles.icon}
                /> */}
                <View style={styles.textContainer}>
                  <Text style={styles.valueText}>103,2</Text>
                  <Text style={styles.unitText}>km</Text>
                </View>
              </View>

              {/* Second Section: Stopwatch */}
              <View style={styles.section}>
                {/* <Image
                  source={require('./assets/stopwatch-icon.png')} // Gambar stopwatch
                  style={styles.icon}
                /> */}
                <View style={styles.textContainer}>
                  <Text style={styles.valueText}>16,9</Text>
                  <Text style={styles.unitText}>hr</Text>
                </View>
              </View>

              {/* Third Section: Calories */}
              <View style={styles.sectionLast}>
                {/* <Image
                  source={require('./assets/fire-icon.png')} // Gambar api
                  style={styles.icon}
                /> */}
                <View style={styles.textContainer}>
                  <Text style={styles.valueText}>1,5</Text>
                  <Text style={styles.unitText}>kcal</Text>
                </View>
              </View>
            </View>
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
    backgroundColor: '#ffffff',
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
  textContainerHead: {
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
    height: height * 0.98,
    position: 'absolute',
    top: 0,
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    marginHorizontal: width * 0.01,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: width * 0.53,
    height: width * 0.45,
    borderWidth: 2,
    borderColor: '#AAC7D8',
  },
  buttonTra: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    marginHorizontal: width * 0.01,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: width * 0.4,
    height: width * 0.45,
    borderWidth: 2,
    borderColor: '#AAC7D8',
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iconCoTra: {
    marginBottom: 5,
  },
  buttonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonSubtitle: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
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
  Runbtn: {
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
    backgroundColor: 'white',
    width: width * 0.87,
    height: width * 0.35,
    borderWidth: 2,
    borderColor: '#AAC7D7',
    marginTop: height * 0.14,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 5,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },

  arrowText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#AAC7D8',
  },

  progressBox: {
    flexDirection: 'row',
    width: width * 0.83,
    height: height * 0.08,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#AAC7D7',
    borderRadius: 6,
    marginTop: 5,
  },

  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#AAC7D8',
  },

  sectionLast: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },

  icon: {
    width: 25,
    height: 25,
    marginBottom: 5,
  },

  textContainer: {
    alignItems: 'flex-end',
  },

  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },

  unitText: {
    fontSize: 11,
    color: '#888888',
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
    borderWidth: 2,
    borderColor: '#DFEBF7',
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
