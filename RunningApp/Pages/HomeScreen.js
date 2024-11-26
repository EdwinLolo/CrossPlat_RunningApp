import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const HomeScreen = ({ user }) => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Hello,{user.displayName}</Text>
      <Text>Beginner</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ShowCommunity", {
            user: { uid: user.uid, displayName: user.displayName }, // Hanya kirim uid dan displayName
          })
        }
        style={{ backgroundColor: "red" }}
      >
        <Text style={{ color: "white" }}>Community</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Tracking", {
            user: { uid: user.uid, displayName: user.displayName }, // Hanya kirim uid dan displayName
          })
        }
        style={{ backgroundColor: "black" }}
      >
        <Text style={{ color: "white" }}>Tracking</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("RunHistory", {
            user: { uid: user.uid, displayName: user.displayName }, // Hanya kirim uid dan displayName
          })
        }
        style={{ backgroundColor: "blue" }}
      >
        <Text style={{ color: "white" }}>RunHistory</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
