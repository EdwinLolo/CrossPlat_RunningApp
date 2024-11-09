import { StyleSheet, Text, View, Image, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import HomeScreen from "./Pages/HomeScreen";
import HistoryScreen from "./Pages/History";
import Bayar from "./Pages/Bayar";
import Notif from "./Pages/Notif";
import Profile from "./Pages/Profile";

const Tab = createBottomTabNavigator();
const screenOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    height: 60,
    backgroundColor: "#ffffff",
  },
};

export default function BottomNavbar({ user, handleAuthentication }) {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        // component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Entypo
                  name="home"
                  size={24}
                  color={focused ? "#16247d" : "#111"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: focused ? "#16247d" : "#111",
                  }}
                >
                  Home
                </Text>
              </View>
            );
          },
        }}
      >
        {() => <HomeScreen user={user} />}
      </Tab.Screen>
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialCommunityIcons
                  name="history"
                  size={24}
                  color="black"
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: focused ? "#16247d" : "#111",
                  }}
                >
                  Riwayat
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Bayar"
        component={Bayar}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  top: Platform.OS === "ios" ? -10 : -20,
                  width: Platform.OS === "ios" ? 50 : 60,
                  height: Platform.OS === "ios" ? 50 : 60,
                  borderRadius: Platform.OS === "ios" ? 25 : 30,
                  alignItems: "center",
                  justifyContent: "center",
                  // backgroundColor: "#16247d",
                }}
              >
                <View
                  style={{
                    padding: 5,
                    backgroundColor: "#ffffff",
                    borderRadius: 8,
                  }}
                >
                  <Image
                    source={require("./assets/qris.png")}
                    style={{ width: 55, height: 55, borderRadius: 10 }}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    color: focused ? "#16247d" : "#111",
                  }}
                >
                  bayar
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Notif"
        component={Notif}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons name="email" size={24} color="black" />
                <Text
                  style={{
                    fontSize: 12,
                    color: focused ? "#16247d" : "#111",
                  }}
                >
                  Notifikasi
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require("./assets/profile.png")}
                style={{ width: 24, height: 24 }}
              />
              <Text
                style={{ fontSize: 12, color: focused ? "#16247d" : "#111" }}
              >
                Profil
              </Text>
            </View>
          ),
        }}
      >
        {() => (
          <Profile user={user} handleAuthentication={handleAuthentication} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
