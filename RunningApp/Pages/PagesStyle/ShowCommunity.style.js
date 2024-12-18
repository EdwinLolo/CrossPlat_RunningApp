import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AAC7D8",
  },
  header: {
    width: "100%",
    height: 200,
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
  CommunityListContainer: {
    flex: 1,
    padding: 20,
    marginTop: 200,
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
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  communityList: {
    marginTop: 20,
  },
  communityItem: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  communityItemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  communityTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  communityTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  navButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  userProfileContainer: {
    alignItems: "center",
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  emailText: {
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    top: -10,
    left: 5,
  },
});

export default styles;
