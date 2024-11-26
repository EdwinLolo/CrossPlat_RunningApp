import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import styles from "./PagesStyle/SignIn.style";

const AuthScreen = ({
  email,
  setEmail,
  password,
  setPassword,
  isLogin,
  setIsLogin,
  handleAuthentication,
  username, // State baru untuk username
  setUsername, // Setter untuk username
  confirmPassword, // State baru untuk confirmPassword
  setConfirmPassword, // Setter untuk confirmPassword
}) => {
  return (
    <View style={styles.authContainer}>
      <View style={styles.authUI}>
        <Text style={styles.title}>
          {isLogin
            ? "Welcome Back! Glad to see you. Again!"
            : "Hello! Register to get started"}
        </Text>

        {!isLogin && ( // Input username hanya ditampilkan di Sign Up
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            autoCapitalize="none"
          />
        )}

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />

        {!isLogin && ( // Input confirm password hanya ditampilkan di Sign Up
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            secureTextEntry
          />
        )}

        <View style={styles.buttonContainer}>
          <Button
            title={isLogin ? "Login" : "Register"}
            onPress={handleAuthentication}
            color="#000000FF"
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login Here"}
        </Text>
      </View>
    </View>
  );
};

export default AuthScreen;
