// src/styles/styles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  ProfileContainer: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#FFFFFFFF",
  },
  UserContainer: {
    width: "100%",
    height: "30%",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    // maxWidth: 400,
    backgroundColor: "#AAC7D8",
  },
  title: {
    fontSize: 24,
    width: "100%",
    textAlign: "center",
    marginBottom: 20,
    marginRight: 10,
    color: "#ffffff",
  },
  userProfileContainer: {
    width: "100%",
    height: "auto",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 10,
    marginLeft: 65,

  },
  emailText: {
    fontSize: 20,
    marginBottom: 10,
    color: "#ffffff",
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    width: 300,
    height: 40,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,	
  },
  logoutButton: {
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 10,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', 
    bottom: 80, 
    left: '50%', 
    transform: [{ translateX: -50 }], 
  },

  buttonText: {
    color: 'white', 
  },
});

export default styles;
