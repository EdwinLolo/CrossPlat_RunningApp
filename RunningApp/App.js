import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomNavbar from "./BottomNavbar";
import SplashScreen from "./Pages/Splash";
import Login from "./Pages/Login";
import Community from "./Pages/Community";
import Tracking from "./Pages/Tracking";
import ShowCommunity from "./Pages/ShowCommunity";
import CommunityDetail from "./Components/CommunityDetail";
import AddCommunityDetail from "./Components/AddCommunityDetail";

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
          options={{ headerShown: false }}
          style={{ backgroundColor: "#FFFFFF" }}
        />
        <Stack.Screen
          name="Community"
          component={Community}
          options={{ headerShown: true }}
          style={{ backgroundColor: "#FFFFFF" }}
        />
        <Stack.Screen
          name="ShowCommunity"
          component={ShowCommunity}
          options={{ headerShown: true }}
          style={{ backgroundColor: "#FFFFFF" }}
        />
        <Stack.Screen
          name="Tracking"
          component={Tracking}
          options={{ headerShown: true }}
          style={{ backgroundColor: "#FFFFFF" }}
        />
        <Stack.Screen
          name="CommunityDetail"
          component={CommunityDetail}
          options={{ headerShown: true }}
          style={{ backgroundColor: "#FFFFFF" }}
        />
        <Stack.Screen
          name="AddCommunityDetail"
          component={AddCommunityDetail}
          options={{ headerShown: true }}
          style={{ backgroundColor: "#FFFFFF" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
