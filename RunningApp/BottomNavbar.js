import { StyleSheet, Text, View, Image, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "./Pages/HomeScreen";
import HistoryScreen from "./Pages/History";
import RunHistory from "./Pages/RunHistory";
import Profile from "./Pages/Profile";

const Tab = createBottomTabNavigator();
const screenOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 25,
    left: 30,
    right: 30,
    elevation: 0,
    height: 40,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 15,
    backgroundColor: "#AAC7D7",
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
                  color={focused ? "#5D63D1" : "#ffffff"}
                />
                {/* <Text
                  style={{
                    fontSize: 12,
                    color: focused ? "#16247d" : "#111",
                  }}
                >
                  Home
                </Text> */}
              </View>
            );
          },
        }}
      >
        {() => <HomeScreen user={user} />}
      </Tab.Screen>
      <Tab.Screen
        name="History"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialCommunityIcons
                  name="history"
                  size={24}
                  color={focused ? "#5D63D1" : "#ffffff"}
                />
              </View>
            );
          },
        }}
      >
        {() => (
          <RunHistory
            route={{ params: { uid: user.uid, displayName: user.displayName } }}
          />
        )}
      </Tab.Screen>
      {/* <Tab.Screen
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
      /> */}
      {/* <Tab.Screen
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
      /> */}
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons
                name="person"
                size={24}
                color={focused ? "#5D63D1" : "#ffffff"}
              />
              {/* <Text
                style={{ fontSize: 12, color: focused ? "#16247d" : "#111" }}
              >
                Profil
              </Text> */}
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
