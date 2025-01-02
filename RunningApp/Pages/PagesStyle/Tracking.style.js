import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  headerButton: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 55, // to account for status bar
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    top: 40, // to account for status bar
    alignItems: "center",
    justifyContent: "center",
  },
  Runbtn: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: width * 0.87,
    height: width * 0.45,
    borderWidth: 2,
    borderColor: "#AAC7D7",
    position: "absolute",
    bottom: 60,
    left: 30,
    right: 30,
  },
  titleContainer: {
    flexDirection: "column",
    // justifyContent: "space-between",
    // alignItems: "center",
    width: "100%",
    paddingBottom: 5,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  RunningContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Running: {
    flexDirection: "column",
    width: "50%",
  },
  RunningText: {
    fontSize: 14,
  },
  RunningTime: {
    fontSize: 18,
    fontWeight: "bold",
  },
  Start: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  StartButton: {
    padding: 10,
    borderRadius: 10,
    marginRight: 5,
    width: "40%",
    alignItems: "center",
  },
  progressBox: {
    flexDirection: "row",
    width: width * 0.83,
    height: height * 0.09,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#AAC7D7",
    borderRadius: 6,
    marginTop: 5,
    marginBottom: 5,
  },
  section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: "#AAC7D8",
    flexDirection: "row",
  },
  sectionLast: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  textContainer: {
    alignItems: "flex-end",
  },
  valueText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  unitText: {
    fontSize: 11,
    color: "#888888",
  },
});

export default styles;
