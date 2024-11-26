// src/styles/styles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // padding: 16,
    // marginTop: 50,
    // backgroundColor: "#f0f0f0",
  },
  authContainer: {
    width: "100%",
    height: "100%",
    // maxWidth: 400,
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#AAC7D8",
  },
  authUI: {
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
    fontWeight: "600",
    // textAlign: "start",
  },
  input: {
    height: 40,
    backgroundColor: "#ffffff",
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 5,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    width: "100%",
    color: "#000000FF",
    textAlign: "center",
    position: "absolute",
    bottom: 0,
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default styles;
