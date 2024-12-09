import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      padding: 16,
      flex: 1,
      alignItems: "center",
      backgroundColor: "#AAC7D8",
    },
    backButton: {
      position: 'absolute',
      left: 10,
      top: 55, // to account for status bar
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
      top: 40, // to account for status bar
      left: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: "#DFEBF6",
      padding: 10,
      marginBottom: 15,
      top: 40, // to account for status bar
    },
    imagePicker: {
      height: 150,
      width: 150,
      borderWidth: 1,
      borderColor: "#DFEBF6",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      borderRadius: 75,
      overflow: "hidden",
      top: 40, // to account for status bar
    },
    logo: {
      width: "100%",
      height: "100%",
      borderRadius: 75,
    },
    imageText: {
      color: "black",
    },
    createButton: {
      backgroundColor: "#DFEBF6",
      width: 100,
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      top: 40, // to account for status bar
    },
    textCreateButton: {
      fontSize: 16,
      color: "black",
      fontWeight: "bold",
    },
  });

export default styles;