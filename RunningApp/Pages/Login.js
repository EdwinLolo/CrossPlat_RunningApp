import React, { useState, useEffect } from "react";
import { ScrollView, Alert, View, FlatList } from "react-native";
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "@firebase/auth";
import { FIREBASE_AUTH } from "../config/firebaseConfig";
import AuthScreen from "./AuthScreen";
import BottomNavbar from "../BottomNavbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const auth = FIREBASE_AUTH;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setConfirmPassword("");
  };

  const handleAuthentication = async () => {
    if (!isLogin && password !== confirmPassword) {
      Alert.alert("Error", "Password and Confirm Password must be the same.");
      return;
    }

    try {
      if (user) {
        console.log("User logged out successfully!");
        await signOut(auth);
        resetFields();
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
          console.log("User signed in successfully!");
        } else {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          console.log("User created successfully!");

          await updateProfile(userCredential.user, {
            displayName: username,
          });
          console.log("Username set successfully!");
          setIsLogin(true);
          resetFields();
        }
      }
    } catch (error) {
      Alert.alert("Authentication error:", error.message);
      console.error("Authentication error:", error.message);
    }
  };

  const toggleLoginMode = () => {
    setIsLogin(!isLogin);
    resetFields();
  };

  return (
    <>
      {user ? (
        <BottomNavbar user={user} handleAuthentication={handleAuthentication} />
      ) : (
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={toggleLoginMode}
          handleAuthentication={handleAuthentication}
          username={username}
          setUsername={setUsername}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
      )}
    </>
  );
};

export default Login;
