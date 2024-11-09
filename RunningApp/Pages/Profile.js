// src/screens/Profile.js
import React from "react";
import { View, Text, Button } from "react-native";
import styles from "./PagesStyle/SignIn.style";

const Profile = ({ user, handleAuthentication }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Welcome</Text>
      {user ? (
        <Text style={styles.emailText}>{user.email}</Text>
      ) : (
        <Text style={styles.emailText}>User not available</Text>
      )}
      <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
    </View>
  );
};

export default Profile;
