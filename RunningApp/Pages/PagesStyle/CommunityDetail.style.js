import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AAC7D8",
  },
  header: {
    width: "100%",
    height: 250,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DFEBF6",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 40, // to account for status bar
  },
  headerButton: {
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 10, // to account for status bar
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    top: -5, // to account for status bar
  },
  userProfileContainer: {
    alignItems: "center",
  },
  emailText: {
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    top: -10,
    left: 5,
  },
  addButton: {
    position: "absolute",
    right: 10,
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    // marginTop: 220, // to account for header height
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  emailText: {
    fontSize: 18,
    // fontWeight: "bold",
    marginTop: 10,
  },
  postContainer: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    // backgroundColor: "#f0f0f0",
    marginBottom: 10,
    marginTop: 250,
  },
  postItemContainer: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  postItem: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
  postImage: {
    width: width * 0.35,
    height: height * 0.15,
    borderRadius: 5,
    marginRight: 10,
  },
  postTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 10,
    color: "#666",
    marginTop: 5,
  },
});

export default styles;
