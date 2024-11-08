// src/Pages/Profile.js
import { View, Text, Button } from "react-native";
import React from "react";

const Profile = ({ user, handleAuthentication }) => {
  return (
    <View>
      <Text>Welcome</Text>
      <Text>{user ? user.email : "Guest"}</Text>
      <Button
        title="Logout"
        onPress={() => handleAuthentication()}
        color="#e74c3c"
      />
    </View>
  );
};

export default Profile;
