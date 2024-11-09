import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomNavbar from "./BottomNavbar";
import SplashScreen from "./Pages/Splash";
import Login from "./Pages/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <StatusBar backgroundColor="#1e1e1e" barStyle="dark-content" /> */}
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerTintColor: "#000000",
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
          style={{ backgroundColor: "#FFFFFF" }}
        />
        <Stack.Screen
          name="Main"
          component={Login}
          options={{ headerShown: false }}
          style={{ backgroundColor: "#FFFFFF" }}
        />
        <Stack.Screen
          name="BottomNavbar"
          component={BottomNavbar}
          options={{ headerShown: true }}
          style={{ backgroundColor: "#FFFFFF" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
