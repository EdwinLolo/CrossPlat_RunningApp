// src/screens/Login.js
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "@firebase/auth";
import { FIREBASE_AUTH } from "../config/firebaseConfig";
import AuthScreen from "./AuthScreen";
import styles from "./PagesStyle/SignIn.style";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Main"); // Pindah ke Main setelah login
      }
    });
    return () => unsubscribe();
  }, [auth, navigation]);

  const handleAuthentication = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AuthScreen
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        handleAuthentication={handleAuthentication}
      />
    </ScrollView>
  );
};

export default Login;
