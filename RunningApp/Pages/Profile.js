// src/screens/Profile.js
import React from "react";
import { View, Text, Button, Image } from "react-native";
import styles from "./PagesStyle/Profile.style.js";

const Profile = ({ user, handleAuthentication }) => {
  return (
    <View style={styles.ProfileContainer}>
      <View style={styles.UserContainer}>
        <Text style={styles.title}>Profile</Text>
        {user ? (
          <View>
            <View style={styles.userProfileContainer}>
              <Image
                style={styles.userImage}
                source={require("../assets/profile.png")}
              />
            </View>
            <Text style={styles.emailText}>{user.email}</Text>
            <Text style={styles.emailText}>{user.displayName}</Text>
          </View>
        ) : (
          <Text style={styles.emailText}>User not available</Text>
        )}
        <Button
          style={styles.logout}
          title="Logout"
          onPress={handleAuthentication}
          color="#e74c3c"
        />
      </View>
    </View>
  );
};

export default Profile;
