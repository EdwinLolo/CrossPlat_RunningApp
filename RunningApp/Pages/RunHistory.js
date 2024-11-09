import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";

const RunHistory = ({ history }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Run History</Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.historyItem}>
            <Text>Run {index + 1}</Text>
            <Text>Distance: {item.distance.toFixed(2)} km</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  historyItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
});

export default RunHistory;
